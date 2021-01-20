import { v4 } from "uuid";

export interface CompiledFilter {
    (sequence: Array<String>) : Boolean;
}

export abstract class Filter {
    public name: string = "Unknown Filter";
    public componentType: string = "Relative";
    public type: string = "empty";
    public id: string = v4();

    constructor(partial: Partial<Filter>) {
        Object.assign(this, partial);
    }

    abstract compile() : CompiledFilter
}

export class CountGreaterThanFilter extends Filter {
    number: Number;
    outcome: String;

    constructor(number: Number, outcome: String) {
        super({ name: "Count Greater Than", componentType: "Relative", type: "countgt"});
        this.number = number;
        this.outcome = outcome;
    }

    compile() : CompiledFilter {
        return (seq: Array<String>) => seq.reduce((acc, it) => acc + (it === this.outcome ? 1 : 0), 0) > this.number;
    }
}

export class CountEqualToFilter extends Filter {
    public number: Number;
    public outcome: String;

    constructor(number: Number, outcome: String) {
        super({ name: "Count Equal To", componentType: "Relative", type: "counteq"});
        this.number = number;
        this.outcome = outcome;
    }

    compile() : CompiledFilter {
        return (seq: Array<String>) => seq.reduce((acc, it) => acc + (it === this.outcome ? 1 : 0), 0) === this.number;
    }
}

export class CountLessThanFilter extends Filter {
    public number: Number;
    public outcome: String;

    constructor(number: Number, outcome: String) {
        super({ name: "Count Less Than", componentType: "Relative", type: "countlt"});
        this.number = number;
        this.outcome = outcome;
    }

    compile() : CompiledFilter {
        return (seq: Array<String>) => seq.reduce((acc, it) => acc + (it === this.outcome ? 1 : 0), 0) < this.number;
    }
}

export class EmptyFilter extends Filter {
    constructor() {
        super({ name: "Empty Filter", componentType: "Empty" });
    }
    compile(): CompiledFilter {
        return () => true;
    }
}

class FilterFactory {
    make(type: string, outcomes: Array<string>) : Filter {
        switch(type) {
            case "empty":
            default:
                return new EmptyFilter();
            case "countlt":
                return new CountLessThanFilter(0, outcomes[0]);
            case "countgt":
                return new CountGreaterThanFilter(0, outcomes[0]);
            case "counteq":
                return new CountEqualToFilter(0, outcomes[0]);
            
        }
    }
}

export const factory = new FilterFactory();