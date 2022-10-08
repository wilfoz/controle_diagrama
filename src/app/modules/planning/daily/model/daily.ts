export interface Info {
    name?: string,
    unity?: string,
    leader?: string,
}

export interface Totals {
    plannedTotal?: number,
    totalExecuted?: number,
    percentage?: number,
    previousTotal?: number,
    totalExecutedInDay?: number,
    totalPlannedInDay?: number,
    notExecuted?: number,
    towersExecuted?: string,
    towersPlanned?: string,
}

export function merge<First, Second>(obj1: First, obj2: Second) {
    return { ...obj1, ...obj2 }
}
