/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
    email: 'jk@gmail.com',
    address: '123, Titanic St, NY',
    nationality: 'UK',
    seatNum: 1,
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
    email: 'rs@gmail.com',
    address: '123, Titanic St, NY',
    nationality: 'UK',
    seatNum: 2,
  },
];


function TravellerRow(props) {
  /*Q3. Placeholder to initialize local variable based on traveller prop.*/
    const traveller = props.traveller;
    // Since the id is always unique even if deleted, display table may not be consecutive 
    const { id, name, phone, bookingTime, address, email, nationality, seatNum } = traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{bookingTime.toLocaleString()}</td> 
      <td>{address}</td>
      <td>{email}</td>
      <td>{nationality}</td>
      <td>{seatNum}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const tableRows = props.travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />);

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Address</th>
          <th>Email</th>
          <th>Nationality</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {tableRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    this.props.bookTraveller({
      id: -1,
      name: form.travellername.value, phone: form.travellerphone.value,
      phone: form.travellerphone.value,
      bookingTime: new Date(),
      address: form.travelleraddress.value,
      email: form.travelleremail.value, 
      nationality: form.travellernationality.value,
      seatNum: form.travellerseatnum.value,
    });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <input type="text" name="travelleraddress" placeholder="Address" />
        <input type="text" name="travelleremail" placeholder="Email" />
        <input type="text" name="travellernationality" placeholder="Nationality" />
        <input type="text" name="travellerseatnum" placeholder="Seat Number" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    this.props.deleteTraveller({
      name: form.travellername.value,
      phone: form.travellerphone.value,
      address: form.travelleraddress.value,
      email: form.travelleremail.value,
      nationality: form.travellernationality.value,
      seatNum: form.travellernationality.value,
    })
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
      <input type="text" name="travellername" placeholder="Name" />
      <input type="text" name="travellerphone" placeholder="Phone" />
      <input type="text" name="travelleraddress" placeholder="Address" />
      <input type="text" name="travelleremail" placeholder="Email" />
      <input type="text" name="travellernationality" placeholder="Nationality" />
      <input type="text" name="travellerseatnum" placeholder="Seat Number" />
      <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <h2>Homepage - Visual Representation of Free Seats</h2>
    <div>Total Free Seats: {this.props.totalFreeSeats}</div>
	</div>);
	}
}

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.setSelector(1)}>Homepage</button>
        <button onClick={() => this.props.setSelector(2)}>Display Travellers</button>
        <button onClick={() => this.props.setSelector(3)}>Add Traveller</button>
        <button onClick={() => this.props.setSelector(4)}>Delete Traveller</button>
      </div>
    );
  }
}


class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, idCounter: 2 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({selector: value});
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      // Even if deleted, the id should be unique
      const newId = this.state.idCounter + 1; 
      passenger.id = newId; 
      this.setState({travellers : this.state.travellers.concat(passenger), idCounter : newId});
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    // note that once deleted, the id is not reused
    // and all records that match are deleted, no matter what booking time is
    const updatedTravellers = this.state.travellers.filter(traveller => {
      return !(traveller.name == passenger.name && 
               traveller.phone == passenger.phone && 
               traveller.address == passenger.address && 
               traveller.email == passenger.email && 
               traveller.nationality == passenger.nationality &&  traveller.seatNum == passenger.seatNum);
    });
    this.setState({ travellers: updatedTravellers });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
      <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/
          <NavigationBar setSelector={this.setSelector} />
          }
      </div>
      <div>
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/
        this.state.selector === 1 && <Homepage />
        }
        {/*Q3. Code to call component that Displays Travellers.*/
        this.state.selector === 2 && <Display travellers={this.state.travellers} />
        }
        
        {/*Q4. Code to call the component that adds a traveller.*/
        this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />
        }
        {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/
        this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />
        }
      </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
