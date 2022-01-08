const reactRedux = require('react-redux');
const {connect: _connect} = reactRedux;

const defaultMergeProps = (
  stateProps: any,
  dispatchProps: any,
  ownProps: any,
) => Object.assign({}, ownProps, stateProps, dispatchProps);

export function mapStateToProps(mapStateToProps: any, options: any) {
  return _connect(mapStateToProps, {}, defaultMergeProps, options);
}

export function mapDispatchToProps(mapDispatchToProps: any, options: any) {
  const mapStateToProps = () => ({});

  return _connect(
    mapStateToProps,
    mapDispatchToProps,
    defaultMergeProps,
    options,
  );
}

export function connect() {
  return _connect(...arguments);
}
