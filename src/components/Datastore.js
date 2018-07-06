var DataStore = Reflux.createStore({
    init: function () {
      this.data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
          [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
      };
      
      this.trigger();
    },
    // Change data - for example purposes only
    updateData: function () {
      this.data.series = [
        [2, 9, 6, 3, 4, 8, 7, 2, 6, 1, 8, 10],
        [4, 2, 5, 3, 9, 9, 2, 4, 5, 6, 6, 7]
      ];
      
      this.trigger();
    }
  });
  
  /**
   *  React/Chartist component
   */
  
  var ReactChart = React.createClass({
    componentDidMount: function () {
      this.updateChart(this.props.data);
    },
    componentWillReceiveProps: function (nextProps) {
      this.updateChart(nextProps.data);
    },
    updateChart: function (data) {
      return new Chartist.Bar('.chart', data);
    },
    render: function () {
      return (
        <div>
          <div className="chart"></div>
          <button onClick={DataStore.updateData}>Change data</button>
        </div>
      );
    }
  });
  
  /**
   *  Top-level React component
   */
  
  var App = React.createClass({
    mixins: [
      Reflux.connect(DataStore)
    ],
    render: function () {
      return (
        <ReactChart data={DataStore.data} />
      );
    }
  });
  
  export default DataStore;