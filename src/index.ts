export class Log {
    static logWithColor(msg: string, color: string, bgColor?: string) {
      const colors: { [key: string]: string } = {
        black: '30',
        red: '31',
        green: '32',
        yellow: '33',
        blue: '34',
        magenta: '35',
        cyan: '36',
        white: '37',
      };
  
      const bgColors: { [key: string]: string } = {
        black: '40',
        red: '41',
        green: '42',
        yellow: '43',
        blue: '44',
        magenta: '45',
        cyan: '46',
        white: '47',
      };
  
      const colorCode = colors[color];
      const bgColorCode = bgColors[bgColor || 'black'];
  
      const timestamp = new Date().toLocaleString();
  
      if (colorCode && bgColorCode) {
        console.log(`\x1b[${bgColorCode};${colorCode}m[${timestamp}] ${msg}\x1b[0m`); //----  \x1b[36m%s\x1b[0m
      } else if (colorCode) {
        console.log(`\x1b[${colorCode}m[${timestamp}] ${msg}\x1b[0m`);
      } else {
        console.log(`[${timestamp}] ${msg}`);
      }
    }
  }