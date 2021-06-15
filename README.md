# COVID-19 Tracker India

COVID-19 Tracker app that shows real time COVID-19 statistics in different states and districts across India. It fetches data from the API via [Flask](https://flask.palletsprojects.com/en/2.0.x/).

Go to App: [COV19India-Tracker](https://cov19india-tracker.herokuapp.com/)

## Languages/Libraries used

- [Python](http://python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Bootstrap 5](http://getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)

## Features

- Shows real-time confirmed, active, recovered and deceased numbers of COVID-19 in different states and districts of India.
- Displays the daily growth in cases across India in last 30 days, 90 days or even from the start of the pandemic through interactive charts.
- Interactive map.
- Testing and Vaccination data.
- Search in your district or state.

## Installation

`git clone https://github.com/ujjawal30/covid19-tracker-india.git`

`cd covid19-tracker-india`

`python -m venv <custom-virtual-env-name>`

`source <custom-virtual-env-name>/Scripts/activate`

`pip install -r requirements.txt`

`flask run`

## Screenshots

![Homepage 1](https://github.com/ujjawal30/covid19-tracker-india/blob/main/screenshots/indexpage1.png)

![Homepage 2](https://github.com/ujjawal30/covid19-tracker-india/blob/main/screenshots/indexpage2.png)

## Source

Data is being fetched from API: [api.covid19india.org](https://api.covid19india.org).

**Note**: The individual state page is not completed yet. I'm working on it.😊
