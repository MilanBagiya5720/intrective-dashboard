Certainly! Below is a well-structured and properly formatted `README.md` file in markdown format:

# Interactive Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

This is an interactive dashboard project built with **Angular (Version 17.3.0)** using **NGRX** for state management, **ngx-charts** for data visualization, and **Angular Material** for UI components.

## Stacks Used

- **Angular**: Version 17.3.0
- **NGRX**: For state management
- **ngx-charts**: For data visualization (charts)
- **Angular Material**: For UI components

## Project Setup

Follow the steps below to get the project running locally:

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

git clone http://github.com/MilanBagiya/interactive-dashboard

### 2. Navigate to the Project Folder

After cloning the repository, navigate to the project folder:

```bash
cd interactive-dashboard
```

### 3. Install Dependencies

Install the required dependencies by running:

```bash
npm install
```

### 4. Run the Development Server

After the dependencies are installed, start the development server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

```
http://localhost:4200
```

The application will automatically reload if you make changes to any of the source files.

## Code Scaffolding

You can generate components, services, directives, and more using the Angular CLI. For example:

- To generate a new component:

  ```bash
  ng generate component component-name
  ```

- To generate a service:

  ```bash
  ng generate service service-name
  ```

For a complete list of scaffolding commands, refer to the [Angular CLI Command Reference](https://angular.io/cli).

## Build

To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. You can deploy the contents of this directory to your preferred hosting platform.

## Running Unit Tests

To run the unit tests via [Karma](https://karma-runner.github.io), use the following command:

```bash
ng test
```

This will execute all the unit tests in the project and display the results in the terminal.

You can configure and customize e2e tests as needed. For more information, visit the [Angular End-to-End Testing documentation](https://angular.io/guide/testing#end-to-end-testing).

## Further Help

For more help with Angular CLI commands, use:

```bash
ng help
```

Alternatively, you can visit the [Angular CLI Overview and Command Reference](https://angular.io/cli) for more detailed information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Key Sections in the `README.md`:

- **Project Overview**: Brief description of the project, including the technologies used.
- **Project Setup**: Instructions on cloning the repository, installing dependencies, and running the development server.
- **Code Scaffolding**: How to generate Angular components, services, and other entities using Angular CLI.
- **Build**: Instructions on how to build the project for production.
- **Running Unit Tests**: Instructions on running unit tests with Karma.
- **Running End-to-End Tests**: Instructions on running e2e tests.
- **Further Help**: How to get more help with Angular CLI.
- **License**: Includes the project license information.
```

## Features

- **Dynamic Metric Selection**: Users can select different metrics (e.g., sales data, user engagement, performance stats, stock data) via a dropdown, with the selected metric dynamically updating the displayed chart.
- **Responsive Data Visualization**: The dashboard displays different chart types based on the selected metric:
  - **Bar Chart** for sales data
  - **Pie Chart** for user engagement
  - **Line Chart** for performance stats
  - **Vertical Chart** for stock data
- **Async Data Binding**: Data is fetched and displayed reactively using Angular's `async` pipe and observables.

- **Chart Titles**: Each chart has a dynamic title based on the selected metric.

- **Chart Configuration**: Users can adjust chart settings using the integrated `app-chart-config` component. The following customizations are available:

  - **Color Scheme**: Choose from various color schemes.
  - **Chart Width**: Adjust the chart's width (from 300px to 1200px).
  - **Chart Height**: Adjust the chart's height (from 200px to 800px).
  - **Bar Padding**: Control the space between bars in bar charts.
  - **Gradient Effect**: Enable/disable gradient effects in the chart.
  - **Round Edges**: Enable/disable rounded edges for chart bars.
  - **Zoom In/Out**: Buttons to zoom in or out on the chart for better visibility.

- **Material Design**: The UI is built with Angular Material components, ensuring a clean and modern design.

- **Responsive Layout**: The dashboard is designed to work seamlessly across various screen sizes.

- **State Management with NGRX**:
  - The app uses **NGRX** for state management, allowing for predictable state changes and better handling of data.
  - **Selected Metric**: The selected metric is managed in the store, and any changes are automatically reflected across the application.
  - **Chart Configuration**: The configuration settings for the charts (color scheme, chart dimensions, etc.) are stored in the NGRX store, ensuring that customizations are persisted and can be accessed throughout the app.
  - **Data Fetching**: Data is fetched via NGRX effects, ensuring asynchronous actions are handled effectively and state is updated correctly.

## NGRX Store Details

- **State Structure**: The store holds the following key states:

  - `selectedMetric`: Tracks the currently selected metric (e.g., salesData, userEngagement).
  - `chartConfig`: Holds the user-customized chart settings (e.g., chart width, color scheme, gradient effect).
  - `data`: Contains the data required to render the selected chart.

- **Actions**:

  - `MetricSelected`: Action triggered when a new metric is selected by the user.
  - `ChartConfigUpdated`: Action triggered when any chart configuration (e.g., width, color scheme) is modified.
  - `LoadData`: Action to fetch data based on the selected metric.

- **Reducers**:

  - **selectedMetricReducer**: Updates the state of the selected metric.
  - **chartConfigReducer**: Updates the state of the chart configuration based on user input.

- **Effects**:
  - **LoadDataEffect**: Handles asynchronous data fetching for the selected metric.


## Test Coverage

- **100% Test Coverage**: The project has achieved 100% test coverage, ensuring all code paths are well-tested. ![Test Coverage Badge]
![image](https://github.com/user-attachments/assets/8e78b424-d976-4cad-945e-9f6ddf5053ef)
