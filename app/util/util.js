/**
 * 计算面的重心
 * @param {object} geometry 
 * @returns 
 */
function focus(geometry) {
    var polygon = geometry['coordinates'];
    var type=geometry['type'];
    if (type==='Polygon'&&polygon && polygon.length > 0) {
        var arr = polygon[0];
        var length = arr.length;
        var area = 0;
        var lng_ = 0, lat_ = 0;
        for (let i = 1; i < length; i++) {
            var ilng = arr[i][0];
            var ilat = arr[i][1];
            //
            var nlng = arr[i - 1][0];
            var nlat = arr[i - 1][1];
            var temp = (ilng * nlat - ilat * nlng) / 2;
            area += temp;
            lng_ += temp * (ilng + nlng) / 3;
            lat_ += temp * (ilat + nlat) / 3;
        }
        var lng = Math.round(lng_ / area * 1000000) / 1000000;
        var lat = Math.round(lat_ / area * 1000000) / 1000000;
        return [lng, lat];
    }
}