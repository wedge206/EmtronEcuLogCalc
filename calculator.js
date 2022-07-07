function CalculateDatasetUsage(rate, params) {
    return function() {
        if (params() == 0) {
            return 0;
        }

        return ((rate() * params()) / 2) / 1000000;
    }
}

function CalculateTotalTime(model) {
    return function() {
        return Math.round(((model.memSize() / 2) / ((model.dataset1Bytes() * 2) + (model.dataset2Bytes() * 2) + (model.dataset3Bytes() * 2) + (model.dataset4Bytes() * 2) + (model.dataset5Bytes() * 2) + (model.dataset6Bytes() * 2))));// * 1000000);
    }
}

function ParseLogTime(totalTime) {
    return function() {
        var test =
       (new Date(totalTime() * 1000)).toISOString();
       return test.substring(11,19);
    }
}

var dataModel = function() {
    this.memSize = ko.observable(4);

    this.mem32Clicked = function() { this.memSize(32); }
    this.mem24Clicked = function() { this.memSize(24); }
    this.mem16Clicked = function() { this.memSize(16); }
    this.mem8Clicked = function() { this.memSize(8); }
    this.mem4Clicked = function() { this.memSize(4); }
    this.mem2Clicked = function() { this.memSize(2); }
    this.mem1Clicked = function() { this.memSize(1); }
    
    this.dataset1Rate = ko.observable(100);
    this.dataset2Rate = ko.observable(5);
    this.dataset3Rate = ko.observable(30);
    this.dataset4Rate = ko.observable(30);
    this.dataset5Rate = ko.observable(30);
    this.dataset6Rate = ko.observable(30);

    this.dataset1Params = ko.observable(20);
    this.dataset2Params = ko.observable(20);
    this.dataset3Params = ko.observable(0);
    this.dataset4Params = ko.observable(0);
    this.dataset5Params = ko.observable(0);
    this.dataset6Params = ko.observable(0);

    this.dataset1Bytes = ko.pureComputed(CalculateDatasetUsage(this.dataset1Rate, this.dataset1Params), this);
    this.dataset2Bytes = ko.pureComputed(CalculateDatasetUsage(this.dataset2Rate, this.dataset2Params), this);
    this.dataset3Bytes = ko.pureComputed(CalculateDatasetUsage(this.dataset3Rate, this.dataset3Params), this);
    this.dataset4Bytes = ko.pureComputed(CalculateDatasetUsage(this.dataset4Rate, this.dataset4Params), this);
    this.dataset5Bytes = ko.pureComputed(CalculateDatasetUsage(this.dataset5Rate, this.dataset5Params), this);
    this.dataset6Bytes = ko.pureComputed(CalculateDatasetUsage(this.dataset6Rate, this.dataset6Params), this);

    this.logTime = ko.pureComputed(CalculateTotalTime(this), this);
    this.logParsedTime = ko.pureComputed(ParseLogTime(this.logTime), this);
};

ko.applyBindings(new dataModel());