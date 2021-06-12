from flask import Flask, redirect, url_for, request
from flask.templating import render_template
from datetime import datetime
import locale
import pandas

app = Flask(__name__)


def calcElapsedTime(update_time):
    elapsed_time = ""
    updated_at = datetime.strptime(update_time, "%d/%m/%Y %H:%M:%S")
    elapsed = str(datetime.now() - updated_at)
    if "," in elapsed:
        days = elapsed.split(",")[0]
        elapsed_time = days + " ago"
    else:
        hour = elapsed.split(":")[0]
        if hour == "0":
            minute = elapsed.split(":")[1]
            elapsed_time = minute + " minutes ago"
        else:
            hour = elapsed.split(":")[0]
            if hour == "1":
                elapsed_time = hour + " hour ago"
            else:
                elapsed_time = hour + " hours ago"

    return elapsed_time


@app.template_filter()
def numberFormat(value):
    locale.setlocale(locale.LC_NUMERIC, "hi_IN")
    return locale.format("%d", value, grouping=True)


@app.route("/")
def index():
    states_data = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/state_wise.csv"
    )
    icmr_data = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/tested_numbers_icmr_data.csv"
    )
    time_series = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/case_time_series.csv"
    )
    district_data = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/district_wise.csv"
    )

    states_data.sort_values(by=["Confirmed"], inplace=True, ascending=False)

    total_tested = icmr_data.loc[len(icmr_data) - 1, "Total Samples Tested"]
    previous_tested = icmr_data.loc[len(icmr_data) - 2, "Total Samples Tested"]

    total_vaccines = icmr_data.loc[len(icmr_data) - 1, "Total Doses Administered"]
    previous_vaccines = icmr_data.loc[len(icmr_data) - 2, "Total Doses Administered"]

    last_date = icmr_data.loc[len(icmr_data) - 1, "Tested As Of"]

    time_series.columns = time_series.columns.str.replace(" ", "")

    test_update = datetime.strptime(last_date, "%d/%m/%Y")
    test_update = test_update.strftime("%b, %d %Y")

    delta_tested = total_tested - previous_tested
    delta_vaccines = total_vaccines - previous_vaccines

    tested = [total_tested, delta_tested]
    vaccines = [total_vaccines, delta_vaccines]

    statelist = []
    districtlist = []
    districtstate = []

    for row in states_data.itertuples():
        elapsed_time = calcElapsedTime(row.Last_Updated_Time)
        delta_active = row.Delta_Confirmed - (row.Delta_Recovered + row.Delta_Deaths)
        statedata = [
            row.State,
            row.Confirmed,
            row.Delta_Confirmed,
            row.Active,
            row.Recovered,
            row.Delta_Recovered,
            row.Deaths,
            row.Delta_Deaths,
            elapsed_time,
            delta_active,
        ]
        statelist.append(statedata)

    for row in district_data.itertuples():
        if (
            row.District == "Unassigned"
            or row.District == "Unknown"
            or row.District == "Other Region"
            or row.District == "Other State"
            or row.District == "Others"
            or row.District == "Foreign Evacuees"
            or row.District == "Airport Quarantine"
            or row.District == "Railway Quarantine"
        ):
            continue
        districtlist.append(row.District)
        districtstate.append(row.State)

    time_list = []

    for row in time_series.itertuples():
        time_data = [
            row.Date_YMD,
            row.DailyConfirmed,
            row.TotalConfirmed,
            row.DailyRecovered,
            row.TotalRecovered,
            row.DailyDeceased,
            row.TotalDeceased,
        ]
        time_list.append(time_data)

    data = statelist

    return render_template(
        "index.html",
        data=data,
        tested=tested,
        vaccines=vaccines,
        test_update=test_update,
        time=time_list,
        districts=districtlist,
        districtstate=districtstate,
    )


@app.route("/state/<state>")
def state(state):
    states_data = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/state_wise.csv"
    )
    states_data = states_data[states_data.State == state]
    statedata = []

    for row in states_data.itertuples():
        elapsed_time = calcElapsedTime(row.Last_Updated_Time)
        delta_active = row.Delta_Confirmed - (row.Delta_Recovered + row.Delta_Deaths)
        statedata = [
            row.State,
            row.Confirmed,
            row.Delta_Confirmed,
            row.Active,
            row.Recovered,
            row.Delta_Recovered,
            row.Deaths,
            row.Delta_Deaths,
            elapsed_time,
            delta_active,
        ]

    district_data = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/district_wise.csv"
    )
    district_data = district_data[district_data.State == state]
    district_data.sort_values(by=["Confirmed"], inplace=True, ascending=False)
    districtlist = []

    unknown_data = False
    for row in district_data.itertuples():
        if row.District == "Unknown" and row.Confirmed > 1000:
            unknown_data = True
        else:
            districtdata = [
                row.District,
                row.Confirmed,
                row.Delta_Confirmed,
                row.Active,
                row.Recovered,
                row.Delta_Recovered,
                row.Deceased,
                row.Delta_Deceased,
            ]
            districtlist.append(districtdata)

    state = statedata
    data = districtlist

    return render_template(
        "state.html", data=data, state=state, unknown_data=unknown_data
    )


@app.route("/search", methods=["GET"])
def search():
    name = request.args.get("name")
    states_data = pandas.read_csv(
        "https://api.covid19india.org/csv/latest/state_wise.csv"
    )
    states_data = states_data[(states_data.State == name)]

    if not states_data.empty:
        state = name
    else:
        district_data = pandas.read_csv(
            "https://api.covid19india.org/csv/latest/district_wise.csv"
        )
        district_data = district_data[district_data.District == name]
        for row in district_data.itertuples():
            state = row.State

    return redirect(url_for("state", state=state))
