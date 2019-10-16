import React from 'react';
import { ExploreGrid } from '../components/ExploreGrid';

const Explore = ({data}) => {
  return (
    <div>
      <div>
        {<ExploreGrid items={data} />}
      </div>
    </div>
  );
}

export default Explore;
