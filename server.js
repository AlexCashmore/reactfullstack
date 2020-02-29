import cluster from "cluster";
import { cpus } from "os";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import mongojs from "mongojs";
import path from "path";
import favicon from "serve-favicon";

import autoParse from "auto-parse";

import fs from "fs";

import http from "http";
import https from "https";

import compression from "compression";

import requestIp from "request-ip";
import ServerShutdown from "server-shutdown";

import actionsCollector from "./utils/actionsCollector";

const {
    NODE_ENV,
    APP_NAME,
    APP_HOST,
    APP_PORT,
    APP_LISTEN_LAN_ONLY,
    // SESSION_SECRET,
    // COOKIE_SECRET,
    SSL_SECURE,
    HTTPS_SERVER_PORT,
    SSL_CA_BUNDLE,
    SSL_PUBLIC_KEY,
    SSL_CERT,
    SSL_REQUEST_CERT,
    SSL_REJECT_UNAUTHORIZED,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_AUTH_SOURCE,
    DATABASE_CLUSTER,
    DATABASE_REPLICA_SET,
} = process.env;

const numCPUs = 1;

const isClusterEmpty = () => Object.keys(cluster.workers).length === 0;

if(cluster.isMaster) {
    let reloading = false;
    const killingWorkersTimeouts = [];

    const forkWorkers = () => {
        // Create as many workers as CPUs in the system
        console.log("Forking workers...");

        for(let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    };

    const closeWorkers = (message) => {
        if(!isClusterEmpty()) {
            const workers = Object.keys(cluster.workers);

            const recursiveForking = (key) => {
                let currentKey = key;

                if(currentKey >= workers.length) {
                    return;
                }

                const worker = cluster.workers[workers[currentKey]];

                if(worker) {
                    worker.send(message);
                    worker.disconnect();

                    killingWorkersTimeouts[worker.id] = setTimeout(() => {
                        worker.kill();
                    }, 30000);

                    worker.on("disconnect", () => {
                        clearTimeout(killingWorkersTimeouts[worker.id]);
                    });

                    if(reloading) {
                        const newWorker = cluster.fork();

                        newWorker.on("listening", () => {
                            if(currentKey === workers.length - 1) {
                                reloading = false;
                            }

                            recursiveForking(++currentKey);
                        });
                    } else {
                        recursiveForking(++currentKey);
                    }
                }
            };

            recursiveForking(0);
        }
    };

    const reloadWorkers = () => {
        if(!reloading) {
            reloading = true;

            console.log("Reload received, reloading workers.");

            closeWorkers("reload");
        } else {
            console.log("Reloading process is currently active, please wait or force kill the cluster (SIGTERM will close gracefully the HTTP/HTTPS servers).");
        }
    };

    console.log(`Master #${process.pid} is online, starting on ${numCPUs} CPUs.`);

    forkWorkers(); // Forking workers...

    /** Master events **/

    process.on("SIGUSR2", () => {
        reloadWorkers();
    });

    process.on("SIGTERM", () => {
        closeWorkers("shutdown");
    });

    /** Workers events, the individual handlers exists in each worker with process.on **/

    const workersTimeouts = [];

    const errorInitMessage = (pid) => {
        console.error(`Worker #${pid}: Server initialization thread or third party connections are under heavy load, please wait...`);
    };

    cluster.on("fork", (worker) => {
        workersTimeouts[worker.id] = setTimeout(() => {
            errorInitMessage(worker.process.pid);
        }, 5000);
    });

    cluster.on("online", (worker) => {
        console.log(`Worker #${worker.process.pid} is online.`);
    });

    cluster.on("listening", (worker) => {
        clearTimeout(workersTimeouts[worker.id]);
    });

    cluster.on("disconnect", (worker) => {
        console.log(`The worker #${worker.process.pid} has disconnected.`);
    });

    cluster.on("exit", (worker, code, signal) => {
        if(signal) {
            console.log(`Worker #${worker.process.pid} was killed by signal: ${signal}`);
        } else if(code !== 0) {
            console.log(`Worker #${worker.process.pid} exited with error code: ${code}`);
            cluster.fork();
        } else {
            console.log(`Worker #${worker.process.pid} lifecycle is now complete.`);
        }
    });
} else if(cluster.isWorker) {
    const connectionsCleaningInterval = 1000;

    // Libraries require
    const app = express();

    console.log(`${APP_NAME} is now starting in ${NODE_ENV}.`);

    require("express-async-errors"); // patch the express to use async

    app.use(actionsCollector.mw());
    app.use(requestIp.mw());

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(compression());

    // const storageDatabase = `${env.mongoDB.dbLocalStorage}_${env.mongoDB.dbBaseName}`;
    // const mongoStorageURL = `mongodb://localhost:27017/${storageDatabase}`;
    // const mongoStorageConnection = mongojs(mongoStorageURL);

    /** Live, Develop, Test and Staging with MongoDB cluster connection **/
    let mongoConnectionParams = [];

    const mongoConnectionAuth = DATABASE_USERNAME && DATABASE_PASSWORD ? `${encodeURIComponent(DATABASE_USERNAME)}:${encodeURIComponent(DATABASE_PASSWORD)}` : null;
    mongoConnectionParams.push(`authSource=${DATABASE_AUTH_SOURCE || "admin"}`);
    mongoConnectionParams.push("ssl=false");
    if(DATABASE_REPLICA_SET) {
        mongoConnectionParams.push(`replicaSet=${DATABASE_REPLICA_SET}`);
    }
    mongoConnectionParams = mongoConnectionParams.length > 0 ? `?${mongoConnectionParams.join("&")}` : "";

    const mongoConnectionCluster = DATABASE_CLUSTER || "localhost";
    const mongoConnectionURL = `mongodb://${mongoConnectionAuth ? `${mongoConnectionAuth}@` : ""}${mongoConnectionCluster}/${DATABASE_NAME}${mongoConnectionParams}`;
    const mongoConnection = mongojs(mongoConnectionURL);

    /** MongoDB connections requested **/

    app.use(favicon(path.join(__dirname, "/public/favicon.ico")));

    // expose public_html folder as static resources
    app.use(express.static(path.join(__dirname, "/public"), {
        maxage: "1 day",
    }));

    require("./server/index.js")(app, mongoConnection, mongoConnection);

    const serverShutdown = new ServerShutdown();

    if(SSL_SECURE) {
        const httpsOptions = {
            ca: fs.readFileSync(SSL_CA_BUNDLE),
            key: fs.readFileSync(SSL_PUBLIC_KEY),
            cert: fs.readFileSync(SSL_CERT),
            requestCert: autoParse(SSL_REQUEST_CERT),
            rejectUnauthorized: autoParse(SSL_REJECT_UNAUTHORIZED),
        };

        const httpServer = http.createServer((req, res) => {
            res.writeHead(302, {
                Location: `https://${APP_HOST}:${HTTPS_SERVER_PORT}${req.url}`,
            });
            res.end();
        });

        httpServer.listen(APP_PORT, (autoParse(APP_LISTEN_LAN_ONLY) ? "localhost" : ""), () => {
            console.log(`Application redirects http://${APP_HOST}:${APP_PORT}/ server to https://${APP_HOST}:${HTTPS_SERVER_PORT}/`);
        });

        const httpsServer = https.createServer(httpsOptions, app);

        httpsServer.listen(HTTPS_SERVER_PORT, (autoParse(APP_LISTEN_LAN_ONLY) ? "localhost" : ""), () => {
            console.log(`Application listens on SSL port: ${HTTPS_SERVER_PORT}`);
        });

        serverShutdown.registerServer(httpServer);
        serverShutdown.registerServer(httpsServer);
    } else {
        const httpServer = http.createServer(app);
        httpServer.listen(APP_PORT, (autoParse(APP_LISTEN_LAN_ONLY) ? "localhost" : ""), () => {
            console.log(`Application listens on port: ${APP_PORT}`);
        });

        serverShutdown.registerServer(httpServer);
    }

    process.on("SIGTERM", () => {
        serverShutdown.shutdown();
    });

    process.on("message", (message) => {
        if(message === "shutdown" || message === "reload") {
            serverShutdown.shutdown();
        }
    });

    process.on("disconnect", () => {
        actionsCollector.executeWhenEmpty(() => {
            mongoConnection.close();
        }, connectionsCleaningInterval);
    });
}