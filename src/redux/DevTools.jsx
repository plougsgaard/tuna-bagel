import React from 'react'

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools'

// Monitors are separate packages, and you can make a custom one
import DiffMonitor from 'redux-devtools-diff-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// export the old way because we `require` it the old way
module.exports = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'>
    <DiffMonitor />
  </DockMonitor>
)
