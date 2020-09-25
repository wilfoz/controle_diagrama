import * as moment from 'moment';

export class ProductionsTotals {

    constructor(
        private date,
        private productions,
    ) { }

    subTotalTowerExecuted = (prod: any[]): number => {
        if (prod.length > 0) {
            const currentDate = moment(this.date.value);
            return this.filterByStatusAndIsSameDate(prod, currentDate, 'EXECUTADO').length;
        }
        return 0;
    }

    subTotalTowerPlanned = (prod: any[]): number => {
        if (prod.length > 0) {
            const currentDate = moment(this.date.value);
            return this.filterByStatusAndIsAfterDate(prod, currentDate, 'PROGRAMADO').length;
        }
        return 0;
    }

    subTotalKmExecuted = (prod: any[]): number => {
        if (prod.length > 0) {
            const currentDate = moment(this.date.value);
            const result = this.filterByStatusAndIsSameDate(prod, currentDate, 'EXECUTADO');
            const total = this.totalKmReduced(result);
            return +(total / 1000).toFixed(1);
        }
        return 0;
    }

    totalKmExecuted = (activity) => {
        const result = this.productions.filter(prod => prod.activity['name'] === activity && prod.status === 'EXECUTADO');
        const total = this.totalKmReduced(result);
        return +(total / 1000).toFixed(1);
    };

    totalTowerExecuted = (activity) => this.productions.filter(prod => prod.activity['name'] === activity && prod.status === 'EXECUTADO').length;

    filterTowersExecuted = (prod: any[]) => {
        if (prod.length > 0) {
            const currentDate = moment(this.date.value);
            return this.filterByStatusAndIsSameDate(prod, currentDate, 'EXECUTADO').map(result => result.tower['name']);
        }
        return []
    }

    filterTowersPlanned = (prod: any[]) => {
        if (prod.length > 0) {
            const currentDate = moment(this.date.value);
            return this.filterByStatusAndIsAfterDate(prod, currentDate, 'PROGRAMADO').map(result => result.tower['name']);
        }
        return []
    }

    filterLeaders = (prod: any[]) => prod.length > 0 ? prod.map(p => p.leader) : '';

    protected filterByStatusAndIsAfterDate = (data, date, status) => data.filter(element => element.status === status && moment(element.date).isAfter(date));

    protected filterByStatusAndIsSameDate = (data, date, status) => data.filter(element => element.status === status && moment(element.date).isSame(date));

    protected totalKmReduced = data => data.map(data => data.tower['forward']).reduce((acc, curr) => acc + curr, 0);

}
