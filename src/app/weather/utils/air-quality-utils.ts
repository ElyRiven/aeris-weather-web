export class AirQualityUtils {
  static filterComponents(
    components: Record<string, number>
  ): Record<string, number> {
    const { nh3, no, ...filtered } = components;
    return filtered;
  }
}
