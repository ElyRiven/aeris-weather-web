import type { Weather } from '@weather/interfaces/current-weather.interface';

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

  static getWeatherInsight(weather: Weather | undefined): string {
    if (!weather) return '';

    const rainDescription = weather.rain && weather.rain > 0 ? 'rainy, ' : '';

    const snowDescription = weather.snow && weather.snow > 0 ? 'snowy, ' : '';

    const cloudsDescription = this.getCloudsDescription(weather.clouds);

    const windDescription = this.getWindDescription(weather.wind.speed);

    return `Today's weather is ${rainDescription}${snowDescription}${cloudsDescription} and ${windDescription}.`;
  }

  static getCloudsDescription(clouds: number): string {
    if (clouds > 70) return 'very cloudy';

    if (clouds > 30) return 'partly cloudy';

    return 'clear';
  }

  static getWindDescription(speed: number): string {
    if (speed > 11) return 'very windy';

    if (speed >= 6) return 'lightly windy';

    return 'with barely noticeable breezes';
  }
}
