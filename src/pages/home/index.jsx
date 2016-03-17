import React, { Component } from 'react'
import connectToStore from '../../redux/connectToStore'

class HomePage extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <ul className='breadcrumb'>
          <li><a href='/'>Home</a></li>
          <li className='active'>Welcome</li>
        </ul>
        <h1>Some kind of header</h1>
        <div className='row'>
          <div className='col-md-7'>
            <p>Would you like to know a secret?</p>
            <p>Lorem ipsum dolor sit amet, te mei mediocrem assentior, sit te vocent apeirian voluptaria. Errem admodum no cum. Pri eu iuvaret oportere, quo error movet consul eu. Has etiam liber albucius ei, in eius scaevola iracundia vis. Ei vis vidit deterruisset, eu cibo sanctus mel. Eu cum prompta pericula, ius te prodesset mediocritatem.</p>
            <p><a href='/' className='btn btn-primary btn-md'>Go there</a></p>
          </div>

          <div className='col-md-5'>
            <div className='list-group'>
              <a href='/' className='list-group-item active'>
                <h4 className='list-group-item-heading'>Mobilus teamaitcus</h4>
                <p className='list-group-item-text'>
                Lorem ipsum dolor sit amet, te mei mediocrem assentior, sit te vocent apeirian voluptaria.</p>
              </a>
              <a href='/' className='list-group-item'>
                <h4 className='list-group-item-heading'>Futurama 3016</h4>
                <p className='list-group-item-text'>
                Lorem ipsum dolor sit amet, te mei mediocrem assentior, sit te vocent apeirian voluptaria.</p>
              </a>
              <a href='/' className='list-group-item'>
                <h4 className='list-group-item-heading'>Rick & Morty</h4>
                <p className='list-group-item-text'>
                Lorem ipsum dolor sit amet, te mei mediocrem assentior, sit te vocent apeirian voluptaria.</p>
              </a>
            </div>
          </div>

        </div>

        {/*<h2>And a subheader</h2>
        <h3>Third level</h3>
        <h4>And even a fourth</h4>*/}
        <p>Lorem ipsum dolor sit amet, te mei mediocrem assentior, sit te vocent apeirian voluptaria. Errem admodum no cum. Pri eu iuvaret oportere, quo error movet consul eu. Has etiam liber albucius ei, in eius scaevola iracundia vis. Ei vis vidit deterruisset, eu cibo sanctus mel. Eu cum prompta pericula, ius te prodesset mediocritatem.</p>
        <p>An eam dolore option vituperata, tollit periculis ad eum, nec velit recusabo cu. Ad reque dicam eruditi nec. Te erant aperiam sea. Id pro quis option. In quis dicta dissentiet sed. Eu sea ponderum tacimates, nam no natum ludus.</p>
        <p>Prima quodsi ei vim, congue tritani constituam ad eos, exerci suscipit molestiae vim ea. Tantas perpetua ius ex. Esse periculis expetendis id qui, usu cu fugit mazim. Et consul noster referrentur eos. Cu ferri harum nonumy vix. Sit aliquid facilisis elaboraret at, vide praesent ne nec.</p>
        <p>Ei pri laudem graece maiorum. Vero aeque ea eum, nec rebum dolores ea. Vidisse tibique epicuri eum te, eros exerci percipitur an sed, ullum tibique pri te. Ludus omnes prodesset nec id, at malis prompta qui. Sea illud commodo ad, pro ex ludus affert.</p>
      </div>
    )
  }
}

export default connectToStore(HomePage)
