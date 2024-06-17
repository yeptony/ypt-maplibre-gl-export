import { type Map as MaplibreMap } from 'maplibre-gl';
import { type Map as MapboxMap } from 'mapbox-gl';
export default class PrintableAreaManager {
    private map;
    private width;
    private height;
    private unit;
    private svgCanvas;
    private svgPath;
    constructor(map: MaplibreMap | MapboxMap | undefined);
    private mapResize;
    updateArea(width: number, height: number): void;
    private generateCutOut;
    destroy(): void;
    private toPixels;
}
//# sourceMappingURL=printable-area-manager.d.ts.map