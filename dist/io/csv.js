"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extract words from CSV line. Internal function.
 * @param  {string} comma-separated line
 * @returns array of fields. [] if line is empty
 */
function _line2fields(line) {
    var fields = [];
    // helps with trailing empty fields (e.g. 'a,b,,,').
    // Would otherwise be ignored.
    line = line + " ";
    while (line.length > 0) {
        var match = line.match(/^\s*"([^"]+|"")*"\s*(,|;|$)/) ||
            line.match(/^\s*[^,;]*\s*(,|;|$)/);
        var field = match[0];
        line = line.substr(field.length);
        fields.push(field.replace(/[,;]$/, "").replace(/^\s+|\s*$/g, "").replace(/^"|"$/g, ""));
    }
    return fields;
}
var csv = {
    /**
     * Convert CSV string to 2D array of fields
     * @param  {string} string
     * @returns 2D array of fields
     */
    read: function (string) {
        return string
            .split("\n")
            .filter(function (line) { return !line.match(/^\s*$/); })
            .map(_line2fields);
    }
};
exports.default = csv;
//# sourceMappingURL=csv.js.map