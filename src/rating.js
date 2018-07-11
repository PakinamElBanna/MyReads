import ReactStars from "react-stars";
import React, { Component } from "react";

class Rating extends Component {
  getAverageRating = rating => {
    if (this.props.averageRating) {
      let total_rating =
        rating + this.props.averageRating * this.props.ratingsCount;
      return total_rating / (this.props.ratingsCount + 1);
    } else {
      return rating;
    }
  };

  ratingChanged = newRating => {
    // TODO: Investigate the possibility of updating the actual book rating.
    const averageRating = this.getAverageRating(newRating);
    this.props.rateBook(averageRating);
  };

  render() {
    const { averageRating } = this.props;
    return (
      <div>
        <ReactStars
          count={5}
          onChange={this.ratingChanged}
          size={24}
          color2={"#ffd700"}
          edit={false}
          value={averageRating}
        />
      </div>
    );
  }
}
export default Rating;
