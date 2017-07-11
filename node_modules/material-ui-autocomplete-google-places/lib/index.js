'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _place = require('material-ui/svg-icons/maps/place');

var _place2 = _interopRequireDefault(_place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GooglePlaceAutocomplete = function (_Component) {
  _inherits(GooglePlaceAutocomplete, _Component);

  function GooglePlaceAutocomplete(props) {
    _classCallCheck(this, GooglePlaceAutocomplete);

    var _this = _possibleConstructorReturn(this, (GooglePlaceAutocomplete.__proto__ || Object.getPrototypeOf(GooglePlaceAutocomplete)).call(this, props));

    _this.state = {
      data: [],
      searchText: ''
    };

    var google = window.google;
    _this.geocoder = new google.maps.Geocoder();

    // Documentation for AutocompleteService
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
    _this.service = new google.maps.places.AutocompleteService(null);

    // binding for functions
    _this.updateInput = _this.updateInput.bind(_this);
    _this.populateData = _this.populateData.bind(_this);
    _this.getCurrentDataState = _this.getCurrentDataState.bind(_this);
    _this.getLatLgn = _this.getLatLgn.bind(_this);
    return _this;
  }

  _createClass(GooglePlaceAutocomplete, [{
    key: 'getCurrentDataState',
    value: function getCurrentDataState() {
      return this.state.data;
    }
  }, {
    key: 'getLatLgn',
    value: function getLatLgn(locationID, cb) {
      this.geocoder.geocode({ placeId: locationID }, function (results, status) {
        cb(results, status);
      });
    }
  }, {
    key: 'updateInput',
    value: function updateInput(searchText) {
      var _this2 = this;

      if (searchText.length > 0) {
        this.setState({
          searchText: searchText
        }, function () {
          var outerScope = _this2;
          _this2.service.getPlacePredictions({
            input: _this2.state.searchText,
            componentRestrictions: _this2.props.componentRestrictions,
            types: _this2.props.types
          }, function (predictions) {
            if (predictions) {
              outerScope.populateData(predictions);
            }
          });
        });
      }
    }
  }, {
    key: 'populateData',
    value: function populateData(array) {
      this.setState({ data: array });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_materialUi.AutoComplete, {
          anchorOrigin: this.props.anchorOrigin,
          animated: this.props.animated || true,
          animation: this.props.animation,
          errorStyle: this.props.errorStyle,
          errorText: this.props.errorText,
          floatingLabelText: this.props.floatingLabelText,
          fullWidth: this.props.fullWidth || true,
          hintText: this.props.hintText || ' ',
          listStyle: this.props.listStyle,
          maxSearchResults: this.props.maxSearchResults,
          menuCloseDelay: this.props.menuCloseDelay,
          menuStyle: this.props.menuStyle,
          onClose: this.props.onClose,
          open: this.props.open || false,
          style: this.props.style,
          targetOrigin: this.props.targetOrigin,
          textFieldStyle: this.props.textFieldStyle
          // Used by Google Places API / No user input
          , searchText: this.state.searchText,
          onUpdateInput: this.updateInput,
          onChange: this.updateInput,
          filter: _materialUi.AutoComplete.noFilter,
          onNewRequest: function onNewRequest(chosenRequest, index) {
            var dataItem = _this3.state.data[index];
            // indexing bug
            if (!dataItem) {
              dataItem = _this3.state.data[0];
            }
            _this3.getLatLgn(dataItem.place_id, function (results) {
              _this3.props.results(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            });
          },
          dataSource: this.state.data.map(function (item, i, a) {
            if (i === a.length - 1) {
              return {
                text: '',
                value: _react2.default.createElement(_materialUi.MenuItem, {
                  style: { cursor: 'default' },
                  disabled: true,
                  children: _react2.default.createElement(
                    'div',
                    { style: { paddingTop: 20 } },
                    _react2.default.createElement('img', {
                      style: { float: 'right' },
                      width: 96,
                      height: 12,
                      src: 'https://developers.google.com/places/documentation/images/powered-by-google-on-white.png',
                      alt: 'presentation'
                    })
                  )
                }) };
            }
            return {
              text: item.description,
              value: _react2.default.createElement(_materialUi.MenuItem, {
                style: _this3.props.menuItemStyle || {
                  fontSize: 13,
                  display: 'block',
                  paddingRight: 20,
                  overflow: 'hidden'
                },
                innerDivStyle: _this3.props.innerDivStyle || { paddingRight: 38, paddingLeft: 38 }
                // Used by Google Places / No user input
                , primaryText: item.description,
                leftIcon: _react2.default.createElement(_place2.default, {
                  style: { width: '20px' }
                })
              }) };
          })
        })
      );
    }
  }]);

  return GooglePlaceAutocomplete;
}(_react.Component);

GooglePlaceAutocomplete.propTypes = {
  // Google componentRestrictions
  componentRestrictions: _react2.default.PropTypes.object,
  types: _react2.default.PropTypes.array,
  // AutoComplete properties
  anchorOrigin: _react2.default.PropTypes.object,
  animated: _react2.default.PropTypes.bool,
  animation: _react2.default.PropTypes.func,
  errorStyle: _react2.default.PropTypes.object,
  errorText: _react2.default.PropTypes.any,
  floatingLabelText: _react2.default.PropTypes.string,
  fullWidth: _react2.default.PropTypes.bool,
  hintText: _react2.default.PropTypes.string,
  listStyle: _react2.default.PropTypes.object,
  maxSearchResults: _react2.default.PropTypes.number,
  menuCloseDelay: _react2.default.PropTypes.number,
  menuProps: _react2.default.PropTypes.object,
  menuStyle: _react2.default.PropTypes.object,
  onClose: _react2.default.PropTypes.func,
  onNewRequest: _react2.default.PropTypes.func,
  onUpdateInput: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.bool,
  openOnFocus: _react2.default.PropTypes.bool,
  popoverProps: _react2.default.PropTypes.object,
  searchText: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  targetOrigin: _react2.default.PropTypes.object,
  textFieldStyle: _react2.default.PropTypes.object,
  // Prop types for dataSource
  innerDivStyle: _react2.default.PropTypes.object,
  menuItemStyle: _react2.default.PropTypes.object,
  results: _react2.default.PropTypes.func
};

exports.default = GooglePlaceAutocomplete;