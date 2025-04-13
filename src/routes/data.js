class Event {
    constructor(org, name, date, time, link, description) {
      this.org = org; // Org of the Event "ACM, VDGC"
      this.name = name; // Name of the Event
      this.date = date; // date of Event
      this.time = time; // time of Event
      this.link = link; // any link they want 
      this.description = description; // a description of the event
    }
}

const data_list = [];

function addEvent(org, name, date, time, link, description) {
    const newEvent = new Event(org, name, date, time, link, description);
    eventsList.push(newEvent);
}

function removeData(name){
    for(i = 0; i < data_list.length(); i++){
        if(eventsList[i].name == name){
            eventsList.splice(i, 1);
        }
    }
}

function getData(){
    return data_list;
}

function find_by_date(date_){
    const day_list = [];
    for(i = 0; i < data_list.length(); i++){
        if(data_list[i].date_ == date_){
            day_list.push(data_list[i]);
        }
    }
    return day_list;
}