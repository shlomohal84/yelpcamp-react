export const clusters = {
  id: "clusters",
  type: "circle",
  source: "campgrounds",
  filter: ["has", "point_count"],
  paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#00BCD4",
      10,
      "#2196F3",
      30,
      "#3F51B5",
    ],
    "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25],
  },
};

export const clusterCount = {
  id: "cluster-count",
  type: "symbol",
  source: "campgrounds",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPoint = {
  id: "unclustered-point",
  type: "circle",
  source: "campgrounds",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 7,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
};
