import React, { Component } from 'react'
import propTypes from 'prop-types'
import Button from 'components/atom/Button'
import { InputNumber, InputDate } from 'components/atom/Form'
import { withRouter } from 'react-router-dom'

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        duration: 1,
        date: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      },
    };
  }

  updateData = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;

    if (prevState.data.date !== data.date) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(data.date.endDate);
      const countDuration = new Date(endDate - startDate).getDate();
      this.setState({
        data: {
          ...this.state.data,
          duration: countDuration,
        },
      });
    }

    if (prevState.data.duration !== data.duration) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + +data.duration - 1)
      );
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          date: {
            ...this.state.data.date,
            endDate: endDate,
          },
        },
      });
    }
  }

  onBooking = () => {
    const { data } = this.state
    const payload = {
      _id: this.props.itemDetails._id,
      duration: data.duration,
      date: {
        startDate: data.date.startDate,
        endDate: data.date.endDate
      }
    }
    console.log('datas', payload)

    this.props.startBooking({
      _id: this.props.itemDetails._id,
      duration: data.duration,
      date: {
        startDate: data.date.startDate,
        endDate: data.date.endDate
      }
    })
  }

  render() {
    const { data } = this.state
    const { itemDetails, startBooking } = this.props

    return (
      <div className='card bordered' style={{ padding: `60px 80px` }}>
        <h4 className="mb-3">Start Booking</h4>
        <h5 className="h2 text-teal mb-4">
          ${itemDetails.price}{' '}

          <span className="text-muted fw-light">
            per {itemDetails.unit}
          </span>
        </h5>

        <label htmlFor="duration" className='mb-2'>How long you will stay?</label>
        <InputNumber 
          max={30} 
          suffix={' Night'} 
          isSuffixPlural={true} 
          onChange={this.updateData} 
          name="duration" 
          value={data.duration} 
        />

        <label htmlFor="date" className='mb-2'>Pick a Date</label>
        <InputDate 
          onChange={this.updateData}
          name="date"
          value={data.date}
        />

        <h6 className="text-muted fw-light mb-5">
          You will pay {' '}
          <span className="text-primary fw-normal">
            ${itemDetails.price * data.duration} USD
          </span>{' '}
          per{' '}

          <span className="text-primary fw-normal">
            {data.duration} {itemDetails.unit}
          </span>
        </h6>

        <Button type='button' className='btn btn-cta justify-content-center py-3' hasShadow isPrimary isBlock onClick={this.onBooking}>
          Continue to Book
        </Button>
      </div>
    )
  }
}

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func
}

export default withRouter(BookingForm)
