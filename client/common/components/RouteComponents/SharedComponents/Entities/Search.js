import React from "react";

export default class Search {
    static filter(query, input) {
        const text = Object.values(input).join(" ");
        return text.toLowerCase().indexOf(query.replace(/[^\w\s]/gi, "").toLowerCase()) >= 0;
    }

    static highlightText(text, query) {
        let lastIndexValue = 0;
        const words = query
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map(Search.escapeRegExpChars);
        if(words.length === 0) {
            return [text];
        }
        const regexp = new RegExp(words.join("|"), "gi");
        const tokens = [];
        while(text) {
            const match = regexp.exec(text);
            if(!match) {
                break;
            }
            const { length } = match[0];
            const before = text.slice(lastIndexValue, regexp.lastIndex - length);
            if(before.length > 0) {
                tokens.push(before);
            }
            lastIndexValue = regexp.lastIndex;
            tokens.push(<strong key={lastIndexValue}>{match[0]}</strong>);
        }
        const rest = text.slice(lastIndexValue);
        if(rest.length > 0) {
            tokens.push(rest);
        }
        return tokens;
    }

    static escapeRegExpChars(text) {
        return text.replace(/([.*+?^=!:${}()|[\]\\])/g, "\\$1");
    }
}