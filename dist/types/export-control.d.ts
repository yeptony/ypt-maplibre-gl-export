import { ControlPosition, IControl, Map as MaplibreMap } from 'maplibre-gl';
import { Map as MapboxMap } from 'mapbox-gl';
import CrosshairManager from './crosshair-manager';
import PrintableAreaManager from './printable-area-manager';
import { type ControlOptions, FormatType, SizeType, Translation, DPIType, UnitType } from './interfaces';
export default class MaplibreExportControl implements IControl {
    protected controlContainer: HTMLElement;
    protected exportContainer: HTMLElement;
    protected crosshair: CrosshairManager | undefined;
    protected printableArea: PrintableAreaManager | undefined;
    protected map?: MaplibreMap | MapboxMap;
    protected exportButton: HTMLButtonElement;
    protected options: ControlOptions;
    protected MAPLIB_CSS_PREFIX: string;
    constructor(options: ControlOptions);
    getDefaultPosition(): ControlPosition;
    getTranslation(): Translation;
    onAdd(map: MaplibreMap | MapboxMap): HTMLElement;
    protected generateMap(map: MaplibreMap | MapboxMap, size: SizeType, dpi: DPIType, format: FormatType, unit: UnitType, filename?: string): void;
    private createSelection;
    onRemove(): void;
    private onDocumentClick;
    private toggleCrosshair;
    private togglePrintableArea;
    private updatePrintableArea;
}
//# sourceMappingURL=export-control.d.ts.map