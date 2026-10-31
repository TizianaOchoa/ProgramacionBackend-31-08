"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_routes_1 = __importDefault(require("./routes/producto.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/productos', producto_routes_1.default);
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
exports.default = app;
//# sourceMappingURL=app.js.map