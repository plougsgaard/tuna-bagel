import React from 'react'
import { AutoSizer, FlexTable, FlexColumn } from 'react-virtualized'
import _ from 'lodash'

const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC'
}

let config = {
  headerHeight: 30,
  height: 470,
  overscanRowsCount: 0,
  rowHeight: 40,
  scrollToIndex: undefined,
  sortBy: 'name',
  sortDirection: SortDirection.ASC,
  useDynamicRowHeight: false
}

const FoodTable = ({ foods: { entries } }) => {
  const {
    headerHeight,
    height,
    overscanRowsCount,
    rowHeight,
    scrollToIndex,
    sortBy,
    sortDirection,
    useDynamicRowHeight
  } = config
  return (
    <div>
      <AutoSizer disableHeight>
        {({ width }) => (
          <FlexTable
            ref='Table'
            headerClassName='headerColumn'
            headerHeight={headerHeight}
            height={height}
            overscanRowsCount={overscanRowsCount}
            rowClassName='evenRow'
            rowHeight={rowHeight}
            rowGetter={(index) => entries[index]}
            rowsCount={_.size(entries)}
            scrollToIndex={scrollToIndex}
            sort={(sortBy, sortDirection) => { config.sortBy = sortBy; config.sortDirection = sortDirection; }}
            sortBy={sortBy}
            sortDirection={sortDirection}
            width={width}
          >
            <FlexColumn
              label='Name'
              dataKey='name'
              width={150}
            />
            <FlexColumn
              label='Brand'
              dataKey='brand'
              width={150}
            />
            <FlexColumn
              label='Calories'
              dataKey='calories'
              width={90}
            />
            <FlexColumn
              label='Carbohydrates'
              dataKey='carbohydrates'
              width={90}
            />
            <FlexColumn
              label='Sugars'
              dataKey='sugars'
              width={90}
            />
            <FlexColumn
              label='Proteins'
              dataKey='proteins'
              width={90}
            />
            <FlexColumn
              label='Fat'
              dataKey='fat'
              width={90}
            />
            <FlexColumn
              label='Saturated'
              dataKey='saturated'
              width={90}
            />
            <FlexColumn
              label='Fibres'
              dataKey='fibres'
              width={90}
            />
            <FlexColumn
              label='Salt'
              dataKey='salt'
              width={90}
            />
          </FlexTable>
        )}
      </AutoSizer>
    </div>
  )
}

export default FoodTable
