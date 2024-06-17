/// <reference types="mapbox-gl" />
import { Map as MaplibreMap, StyleSpecification } from 'maplibre-gl';
import 'js-loading-overlay';
import { DPIType, FormatType, SizeType, UnitType } from './interfaces';
import { MapGeneratorBase } from './map-generator-base';
export default class MapGenerator extends MapGeneratorBase {
    constructor(map: MaplibreMap, size?: SizeType, dpi?: DPIType, format?: FormatType, unit?: UnitType, fileName?: string, markerCirclePaint?: import("mapbox-gl").CirclePaint, attributionOptions?: import("./interfaces").AttributionOptions, northIconOptions?: import("./interfaces").NorthIconOptions);
    protected getRenderedMap(container: HTMLElement, style: StyleSpecification): MaplibreMap;
    protected renderMapPost(renderMap: MaplibreMap): MaplibreMap;
}
//# sourceMappingURL=map-generator.d.ts.map