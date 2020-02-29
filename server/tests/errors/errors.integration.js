import "../config";

import AppError from "../../errors/AppError";

import InternalServerError from "../../errors/general/InternalServerError";
import BadGateway from "../../errors/general/BadGateway";
import BadRequest from "../../errors/general/BadRequest";
import Conflict from "../../errors/general/Conflict";
import Forbidden from "../../errors/general/Forbidden";
import GatewayTimeout from "../../errors/general/GatewayTimeout";
import InternalConfigurationError from "../../errors/general/InternalConfigurationError";
import NotFound from "../../errors/general/NotFound";
import NotImplemented from "../../errors/general/NotImplemented";
import PaymentRequired from "../../errors/general/PaymentRequired";
import ServiceUnavailable from "../../errors/general/ServiceUnavailable";
import Unauthorized from "../../errors/general/Unauthorized";

import DatabaseConnectionError from "../../errors/custom/DatabaseConnectionError";
import UsernameOrEmailConflict from "../../errors/custom/UsernameOrEmailConflict";
import InsufficientPermissions from "../../errors/custom/InsufficientPermissions";
import AssetNotFound from "../../errors/custom/AssetNotFound";
import GeofenceNotFound from "../../errors/custom/GeofenceNotFound";
import NetworkNotFound from "../../errors/custom/NetworkNotFound";
import OrganizationNotFound from "../../errors/custom/OrganizationNotFound";
import RouteNotFound from "../../errors/custom/RouteNotFound";
import UserNotFound from "../../errors/custom/UserNotFound";
import UserSessionNotFound from "../../errors/custom/UserSessionNotFound";
import TemplateNotFound from "../../errors/custom/TemplateNotFound";
import ProductNotFound from "../../errors/custom/ProductNotFound";
import RouteProductNotFound from "../../errors/custom/RouteProductNotFound";
import RouteAssetNotFound from "../../errors/custom/RouteAssetNotFound";
import ProductAutoCompartmentConflict from "../../errors/custom/ProductAutoCompartmentConflict";
import ProductTypeNotFound from "../../errors/custom/ProductTypeNotFound";
import ProductCompartmentRequired from "../../errors/custom/ProductCompartmentRequired";
import RedisDatabaseConnectionError from "../../errors/custom/RedisDatabaseConnectionError";
import RouteEventNotFound from "../../errors/custom/RouteEventNotFound";
import ProductInheritanceError from "../../errors/custom/ProductInheritanceError";
import ProductOverwritesNotFound from "../../errors/custom/ProductOverwritesNotFound";
import NetworkWalkError from "../../errors/custom/NetworkWalkError";
import OrganizationConnectionNotFound from "../../errors/custom/OrganizationConnectionNotFound";

/* globals test,expect,describe */

describe("As an user of \x1b[1mErrors\x1b[0m I should:", () => {
    test("be able to check an instance of an error", () => {
        const appError = new AppError();
        const error = new InternalServerError();
        expect(appError).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(InternalServerError);
        expect(error).toBeInstanceOf(AppError);
        expect(error).toBeInstanceOf(Error);
    });
    test("have an error with AppError", () => {
        const error = new AppError();
        expect(error).toHaveProperty("message", "Application Error");
        expect(error).toHaveProperty("status", 500);
        expect(error).toHaveProperty("stack");
    });
    test("have an function getJSON() that should return the error in JSON without any stack", () => {
        const error = new AppError();
        const response = error.getJSON();
        expect(response).toHaveProperty("message", "Application Error");
        expect(response).toHaveProperty("status", 500);
        expect(response).not.toHaveProperty("stack");
    });
    test("have an error with InternalServerError", () => {
        const error = new InternalServerError();
        expect(error).toHaveProperty("message", "Internal Server Error");
        expect(error).toHaveProperty("status", 500);
        expect(error).toHaveProperty("stack");
    });
    test("have the stack for InternalServerError if it was called with an instance of an Error", () => {
        const defaultError = new Error("Really Bad Error");
        const error = new InternalServerError(defaultError);
        expect(error).toHaveProperty("message", "Internal Server Error");
        expect(error).toHaveProperty("status", 500);
        expect(error).toHaveProperty("stack", defaultError.stack);
    });
    test("have the message for InternalServerError if it was called with an instance of an Error and message", () => {
        const defaultError = new Error("Really Bad Error");
        const error = new InternalServerError(defaultError, "Hey you!");
        expect(error).toHaveProperty("message", "Hey you!");
        expect(error).toHaveProperty("status", 500);
        expect(error).toHaveProperty("stack", defaultError.stack);
    });
    test("have an error with BadGateway", () => {
        const error = new BadGateway();
        expect(error).toHaveProperty("message", "Bad Gateway");
        expect(error).toHaveProperty("status", 502);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with BadRequest", () => {
        const error = new BadRequest();
        expect(error).toHaveProperty("message", "Bad Request");
        expect(error).toHaveProperty("status", 400);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with Conflict", () => {
        const error = new Conflict();
        expect(error).toHaveProperty("message", "Conflict");
        expect(error).toHaveProperty("status", 409);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with Forbidden", () => {
        const error = new Forbidden();
        expect(error).toHaveProperty("message", "Forbidden");
        expect(error).toHaveProperty("status", 403);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with GatewayTimeout", () => {
        const error = new GatewayTimeout();
        expect(error).toHaveProperty("message", "Gateway Timeout");
        expect(error).toHaveProperty("status", 504);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with InternalConfigurationError", () => {
        const error = new InternalConfigurationError();
        expect(error).toHaveProperty("message", "Internal Configuration Error");
        expect(error).toHaveProperty("status", 506);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with NotFound", () => {
        const error = new NotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with NotImplemented", () => {
        const error = new NotImplemented();
        expect(error).toHaveProperty("message", "Not Implemented");
        expect(error).toHaveProperty("status", 501);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with PaymentRequired", () => {
        const error = new PaymentRequired();
        expect(error).toHaveProperty("message", "Payment Required");
        expect(error).toHaveProperty("status", 402);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ServiceUnavailable", () => {
        const error = new ServiceUnavailable();
        expect(error).toHaveProperty("message", "Service Unavailable");
        expect(error).toHaveProperty("status", 503);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with Unauthorized", () => {
        const error = new Unauthorized();
        expect(error).toHaveProperty("message", "Unauthorized");
        expect(error).toHaveProperty("status", 401);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with DatabaseConnectionError", () => {
        const error = new DatabaseConnectionError();
        expect(error).toHaveProperty("message", "Database Connection Error");
        expect(error).toHaveProperty("status", 502);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with UsernameOrEmailConflict", () => {
        const error = new UsernameOrEmailConflict();
        expect(error).toHaveProperty("message", "Conflict");
        expect(error).toHaveProperty("details", "Username or email address already in use");
        expect(error).toHaveProperty("status", 409);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with InsufficientPermissions", () => {
        const error = new InsufficientPermissions();
        expect(error).toHaveProperty("message", "Insufficient Permission");
        expect(error).toHaveProperty("details", "Action requires special permissions");
        expect(error).toHaveProperty("status", 403);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with AssetNotFound", () => {
        const error = new AssetNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Asset not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with GeofenceNotFound", () => {
        const error = new GeofenceNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Geofence not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with NetworkNotFound", () => {
        const error = new NetworkNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Network not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with OrganizationNotFound", () => {
        const error = new OrganizationNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Organization not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with RouteNotFound", () => {
        const error = new RouteNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Route not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with UserNotFound", () => {
        const error = new UserNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "User not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with UserSessionNotFound", () => {
        const error = new UserSessionNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "User session not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with TemplateNotFound", () => {
        const error = new TemplateNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Template not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ProductNotFound", () => {
        const error = new ProductNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Product not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with RouteProductNotFound", () => {
        const error = new RouteProductNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Route product not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with RouteAssetNotFound", () => {
        const error = new RouteAssetNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Route asset not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ProductAutoCompartmentConflict", () => {
        const error = new ProductAutoCompartmentConflict();
        expect(error).toHaveProperty("message", "Conflict");
        expect(error).toHaveProperty("details", "Product can't be auto assigned to a compartment");
        expect(error).toHaveProperty("status", 409);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ProductTypeNotFound", () => {
        const error = new ProductTypeNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Product type not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ProductCompartmentRequired", () => {
        const error = new ProductCompartmentRequired();
        expect(error).toHaveProperty("message", "Bad Request");
        expect(error).toHaveProperty("details", "Product compartment number is required");
        expect(error).toHaveProperty("status", 400);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with RedisDatabaseConnectionError", () => {
        const error = new RedisDatabaseConnectionError();
        expect(error).toHaveProperty("message", "Redis Database Connection Error");
        expect(error).toHaveProperty("status", 502);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with RouteEventNotFound", () => {
        const error = new RouteEventNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Route event not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ProductInheritanceError", () => {
        const error = new ProductInheritanceError();
        expect(error).toHaveProperty("message", "Product Inheritance Error");
        expect(error).toHaveProperty("details", "Product can not be inherited to set an overwrite for your organization");
        expect(error).toHaveProperty("status", 403);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with ProductOverwritesNotFound", () => {
        const error = new ProductOverwritesNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Product overwrites not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with NetworkWalkError", () => {
        const defaultError = new Error("Really Bad Error");
        const error = new NetworkWalkError(defaultError);
        expect(error).toHaveProperty("message", "Network Walk Error");
        expect(error).toHaveProperty("details", "Network could not be traversed from current location");
        expect(error).toHaveProperty("status", 500);
        expect(error).toHaveProperty("stack");
    });
    test("have an error with OrganizationConnectionNotFound", () => {
        const error = new OrganizationConnectionNotFound();
        expect(error).toHaveProperty("message", "Not Found");
        expect(error).toHaveProperty("details", "Organization connection not found");
        expect(error).toHaveProperty("status", 404);
        expect(error).toHaveProperty("stack");
    });
});