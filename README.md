# 2026 UAS Calculator

A pure JavaScript & HTML implementation of the new University Admission Score (UAS) computation starting from 2026.

## About

This calculator helps students understand how their grades will be computed under the new UAS system that will be implemented starting 2026. It provides a simple, client-side tool for calculating admission scores based on the updated criteria.

## Reference

Based on the official announcement: [Learn for Life: Forging Our Collective Future, Nurturing Diverse Talents and Expanding Pathways](https://www.moe.gov.sg/news/press-releases/20230301-learn-for-life-forging-our-collective-future-nurturing-diverse-talents-and-expanding-pathways)

## Usage

### Running the Application

This is a simple HTML/CSS/JavaScript project that runs entirely in the browser. To use the calculator:

1. **Option 1: Direct File Opening**
   - Download or clone this repository
   - Open `index.html` in your web browser

2. **Option 2: Using a Local Server (Recommended)**
   - Use any HTTP server to serve the files locally
   - Navigate to the served URL in your browser

### How to Use the Calculator

1. Open the application in your web browser
2. Enter your subject grades and relevant scores
3. The calculator will automatically compute your UAS based on the 2026 criteria
4. Review your calculated score and understand how it's derived

## Features

- Client-side calculation (no data sent to servers)
- Real-time score computation
- Clear breakdown of how scores are calculated
- Responsive design for mobile and desktop use

## Contributing

We welcome contributions to improve the calculator! Here's how to get started:

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nyjc-computing/2026-uas-calculator.git
   cd 2026-uas-calculator
   ```

2. **Set up your development environment in VS Code**
   - Install the [HTTP Server extension](https://marketplace.visualstudio.com/items?itemName=zt5.http-server) in VS Code
   - Open the project folder in VS Code
   - Right-click on `index.html` and select "Start HTTP Server" or use the Command Palette (`Ctrl+Shift+P`) and run "HTTP Server: Start"
   - Open the provided local URL in your browser

3. **Alternative development servers**
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve` or `npx http-server`
   - PHP: `php -S localhost:8000`

### Making Changes

1. Create a new branch for your feature or bug fix
2. Make your changes to the HTML, CSS, or JavaScript files
3. Test your changes thoroughly in different browsers
4. Ensure the calculator still works correctly
5. Submit a pull request with a clear description of your changes

### Code Style

- Use consistent indentation (2 spaces)
- Write clear, descriptive variable and function names
- Add comments for complex calculations
- Test across different browsers and devices

### Reporting Issues

If you find bugs or have suggestions for improvements:
1. Check existing issues to avoid duplicates
2. Create a new issue with a clear title and description
3. Include steps to reproduce the problem
4. Specify your browser and operating system

## License

This project is open source. Please check the repository for license details.

## Support

For questions about the UAS system itself, please refer to the official MOE resources. For issues with this calculator, please open an issue on GitHub.
