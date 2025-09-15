const categories = ['good', 'fair', 'moderate', 'poor', 'very poor'];
const pollutantRanges: Record<string, Array<number>> = {
  so2: [20, 80, 250, 350],
  no2: [40, 70, 150, 200],
  pm10: [20, 50, 100, 200],
  pm2_5: [10, 25, 50, 75],
  o3: [60, 100, 140, 180],
  co: [4400, 9400, 12400, 15400],
};

export class AirQualityUtils {
  static filterComponents(
    components: Record<string, number>
  ): Record<string, number> {
    const { nh3, no, ...filtered } = components;
    return filtered;
  }

  static getAirQualityCategory(
    pollutant: string,
    value: number | undefined
  ): string {
    if (!value) return '';

    const ranges = pollutantRanges[pollutant];

    if (!ranges) return '';

    if (value > ranges[ranges.length - 1]) {
      return categories[categories.length - 1];
    }

    for (let i = 0; i < ranges.length; i++) {
      if (value <= ranges[i]) {
        return categories[i];
      }
    }

    return categories[categories.length - 1];
  }
}
