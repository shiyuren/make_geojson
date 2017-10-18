/**
 * 对geojson进行压缩[算法来自echarts](https://github.com/ecomfe/echarts)
 * @param {object} json 
 * @returns json
 */
function compress(json) {
    json.UTF8Encoding = true;
    var features = json.features;
    if (!features) {
        return;
    }
    features.forEach(function (feature) {
        var encodeOffsets = feature.geometry.encodeOffsets = [];
        var coordinates = feature.geometry.coordinates;
        if (feature.geometry.type === 'Polygon') {
            coordinates.forEach(function (coordinate, idx) {
                coordinates[idx] = encodePolygon(
                    coordinate, encodeOffsets[idx] = []
                );
            });
        } else if (feature.geometry.type === 'MultiPolygon') {
            coordinates.forEach(function (polygon, idx1) {
                encodeOffsets[idx1] = [];
                polygon.forEach(function (coordinate, idx2) {
                    coordinates[idx1][idx2] = encodePolygon(
                        coordinate, encodeOffsets[idx1][idx2] = []
                    );
                });
            });
        }
    });
    return json;
}
/**
 * 
 * 
 * @param {any} coordinate 
 * @param {any} encodeOffsets 
 * @returns 
 */
function encodePolygon(coordinate, encodeOffsets) {
    var result = '';
    var prevX = quantize(coordinate[0][0]);
    var prevY = quantize(coordinate[0][1]);
    // Store the origin offset
    encodeOffsets[0] = prevX;
    encodeOffsets[1] = prevY;

    for (var i = 0; i < coordinate.length; i++) {
        var point = coordinate[i];
        result += encode(point[0], prevX);
        result += encode(point[1], prevY);

        prevX = quantize(point[0]);
        prevY = quantize(point[1]);
    }

    return result;
}

function quantize(val) {
    return Math.ceil(val * 1024);
}

function encode(val, prev) {
    // Quantization
    val = quantize(val);
    // var tmp = val;
    // Delta
    val = val - prev;

    if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
        //WTF, 8232 will get syntax error in js code
        val--;
    }
    // ZigZag
    val = (val << 1) ^ (val >> 15);
    // add offset and get unicode
    return String.fromCharCode(val + 64);
    // var tmp = {'tmp' : str};
    // try{
    //     eval("(" + JSON.stringify(tmp) + ")");
    // }catch(e) {
    //     console.log(val + 64);
    // }
}
//
//geojson对象
function Geojson() {
    this.type = "FeatureCollection";
    this.features = [];
    this.UTF8Encoding = isCompress;
}

//feature对象
function Feature() {
    this.type = "Feature";
    this.id = '';
    this.properties = {
        "name": '',
        "code": '',
        "cp": [],
        "childNum": 1
    };
    this.geometry = {
        "type": "Polygon",
        "coordinates": []
    };
}
module.exports={
    compress:compress,
}