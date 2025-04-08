# Team-Mudeng-SureRide
Devised strategies to reduce demand-supply imbalance during peak hours 
Architecure Diagram : 
![Image](https://github.com/user-attachments/assets/f3fd2a69-b6a7-4280-8413-02c50cdee142)

---

# Team-Mudeng-SureRide

## Introduction

Team-Mudeng-SureRide aims to enhance ride allocation efficiency in ride-hailing applications, especially during peak hours. The project introduces two primary systems:

1. **Driver Acceptance Score System**: Evaluates drivers based on their ride acceptance behaviors, considering factors like traffic conditions and historical acceptance rates. Drivers with higher scores may receive benefits such as incentives and priority allocations.

2. **Dynamic Demand Management System**: Predicts ride demand, positions drivers optimally, and offers pre-scheduling features for users.

## Repository Structure

The repository is organized as follows:

```
Team-Mudeng-SureRide/
├── AcceptanceScore/
│   ├── acceptance_score_calculator.py
│   ├── driver_data.csv
│   └── README.md
├── AdaptivePricingModel/
│   ├── pricing_model.py
│   ├── pricing_data.csv
│   └── README.md
├── Prediction/
│   ├── demand_prediction.py
│   ├── historical_demand.csv
│   └── README.md
├── DataGeneration/
│   ├── data_augmentation.py
│   ├── raw_data.csv
│   └── README.md
├── ReactPython/
│   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   ├── server/
│   │   ├── server.py
│   │   └── requirements.txt
│   └── README.md
├── .gitignore
└── README.md
```

## Module Overviews

### 1. AcceptanceScore

This module focuses on calculating the Driver Acceptance Score based on various performance metrics.

- **Files**:
  - `acceptance_score_calculator.py`: Script to compute acceptance scores.
  - `driver_data.csv`: Dataset containing driver performance metrics.
  - `README.md`: Detailed documentation for this module.

### 2. AdaptivePricingModel

Implements dynamic pricing strategies to balance demand and supply during peak hours.

- **Files**:
  - `pricing_model.py`: Script for adaptive pricing calculations.
  - `pricing_data.csv`: Historical pricing and demand data.
  - `README.md`: Detailed documentation for this module.

### 3. Prediction

Handles demand prediction to optimize driver positioning and availability.

- **Files**:
  - `demand_prediction.py`: Script utilizing machine learning models for demand forecasting.
  - `historical_demand.csv`: Dataset of historical ride demand.
  - `README.md`: Detailed documentation for this module.

### 4. DataGeneration

Responsible for generating and augmenting datasets to train and test various models.

- **Files**:
  - `data_augmentation.py`: Script for data augmentation techniques.
  - `raw_data.csv`: Initial raw dataset before augmentation.
  - `README.md`: Detailed documentation for this module.

### 5. ReactPython

Integrates the React frontend with the Python backend to provide a seamless user interface.

- **Directories**:
  - `app/`: Contains React components and pages.
  - `server/`: Houses the Python backend server scripts.
- **Files**:
  - `App.js`: Main React application file.
  - `server.py`: Backend server script.
  - `requirements.txt`: Lists Python dependencies.
  - `README.md`: Detailed documentation for this module.

## Getting Started

To set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ancybjohn02/Team-Mudeng-SureRide.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd Team-Mudeng-SureRide
   ```

3. **Set Up the Backend**:

   - Navigate to the server directory:

     ```bash
     cd ReactPython/server
     ```

   - Install the required Python packages:

     ```bash
     pip install -r requirements.txt
     ```

   - Start the backend server:

     ```bash
     python server.py
     ```

4. **Set Up the Frontend**:

   - Navigate to the app directory:

     ```bash
     cd ../app
     ```

   - Install the required npm packages:

     ```bash
     npm install
     ```

   - Start the React application:

     ```bash
     npm start
     ```

## Contributing

We welcome contributions to enhance the functionalities of Team-Mudeng-SureRide. Please follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Description of changes"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a Pull Request detailing your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---
