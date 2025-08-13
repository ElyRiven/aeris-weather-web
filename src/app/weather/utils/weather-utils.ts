export class WeatherUtils {
  static convertCelciusToFahrenheit(temp: number): string {
    const fahrTemp = temp * 1.8 + 32;
    return Math.round(fahrTemp).toString();
  }

  static convertUnixTimeTo24HTime(time: number): string {
    const date = new Date(time * 1000);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minutes}`;
  }

  static getWindDirectionString(degrees: number, short: boolean): string {
    const shortDirArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const longDirArray = [
      'North',
      'Northeast',
      'East',
      'Southeast',
      'South',
      'Southwest',
      'West',
      'Northwest',
    ];
    const index = Math.round(degrees / 45) % 8;

    return short ? shortDirArray[index] : longDirArray[index];
  }
}
