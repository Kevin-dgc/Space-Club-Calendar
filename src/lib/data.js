export class Event {
    constructor(org, name, date, time, link, description) {
        this.org = org;
        this.name = name;
        this.date = date;
        this.time = time;
        this.link = link;
        this.description = description;
    }
}

let data_list = [];

export function addEvent(org, name, date, time, link, description) {
    const newEvent = new Event(org, name, date, time, link, description);
    data_list.push(newEvent);
    saveJSON();
}

export function removeEvent(name) {
    for (let i = 0; i < data_list.length; i++) {
        if (data_list[i].name === name) {
            data_list.splice(i, 1);
            saveJSON();
            return;
        }
    }
}

export function getData() {
    return data_list;
}

export function find_by_date(date_) {
    const day_list = [];
    for (let i = 0; i < data_list.length; i++) {
        if (data_list[i].date === date_) {
            day_list.push(data_list[i]);
        }
    }
    return day_list;
}

export async function saveJSON() {
    try {
        const res = await fetch('src/lib/api/data/+server.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_list)
        });
        return await res.json();
    } catch (err) {
        console.error("Failed to save data:", err);
    }
}

export async function fetchJSON() {
    try {
        const res = await fetch('src/lib/api/data/+server.js');
        data_list = await res.json();
        return data_list;
    } catch (err) {
        console.error("Failed to fetch data:", err);
        return [];
    }
}
