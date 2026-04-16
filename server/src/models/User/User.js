import { DataTypes, sequelize } from "sequelize";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipcode: { type: DataTypes.STRING }    
}, { tableName: 'users', underscored: true });

// seed data

const MOCK_USERS = [
    { first_name: "Alice",   last_name: "Johnson",  email: "alice@example.com",   city: "Austin",       state: "TX", zipcode: "73301", role: "admin"  },
    { first_name: "Bob",     last_name: "Smith",    email: "bob@example.com",     city: "Denver",       state: "CO", zipcode: "80201", role: "user"   },
    { first_name: "Carol",   last_name: "White",    email: "carol@example.com",   city: "Seattle",      state: "WA", zipcode: "98101", role: "user"   },
    { first_name: "David",   last_name: "Brown",    email: "david@example.com",   city: "Miami",        state: "FL", zipcode: "33101", role: "user"   },
    { first_name: "Eva",     last_name: "Martinez", email: "eva@example.com",     city: "Chicago",      state: "IL", zipcode: "60601", role: "user"   },
    { first_name: "Frank",   last_name: "Lee",      email: "frank@example.com",   city: "Phoenix",      state: "AZ", zipcode: "85001", role: "user"   },
    { first_name: "Grace",   last_name: "Davis",    email: "grace@example.com",   city: "New York",     state: "NY", zipcode: "10001", role: "admin"  },
    { first_name: "Henry",   last_name: "Wilson",   email: "henry@example.com",   city: "Portland",     state: "OR", zipcode: "97201", role: "user"   },
    { first_name: "Isla",    last_name: "Taylor",   email: "isla@example.com",    city: "Nashville",    state: "TN", zipcode: "37201", role: "user"   },
    { first_name: "Jack",    last_name: "Anderson", email: "jack@example.com",    city: "Boston",       state: "MA", zipcode: "02101", role: "user"   },
    { first_name: "Karen",   last_name: "Thomas",   email: "karen@example.com",   city: "Atlanta",      state: "GA", zipcode: "30301", role: "user"   },
    { first_name: "Leo",     last_name: "Jackson",  email: "leo@example.com",     city: "Las Vegas",    state: "NV", zipcode: "89101", role: "user"   },
    { first_name: "Mia",     last_name: "Harris",   email: "mia@example.com",     city: "Minneapolis",  state: "MN", zipcode: "55401", role: "user"   },
    { first_name: "Nathan",  last_name: "Martin",   email: "nathan@example.com",  city: "Dallas",       state: "TX", zipcode: "75201", role: "user"   },
    { first_name: "Olivia",  last_name: "Garcia",   email: "olivia@example.com",  city: "San Diego",    state: "CA", zipcode: "92101", role: "user"   },
    { first_name: "Paul",    last_name: "Martinez", email: "paul@example.com",    city: "Houston",      state: "TX", zipcode: "77001", role: "user"   },
    { first_name: "Quinn",   last_name: "Robinson", email: "quinn@example.com",   city: "Philadelphia", state: "PA", zipcode: "19101", role: "user"   },
    { first_name: "Rachel",  last_name: "Clark",    email: "rachel@example.com",  city: "San Jose",     state: "CA", zipcode: "95101", role: "admin"  },
    { first_name: "Sam",     last_name: "Lewis",    email: "sam@example.com",     city: "Jacksonville", state: "FL", zipcode: "32099", role: "user"   },
    { first_name: "Tina",    last_name: "Walker",   email: "tina@example.com",    city: "Columbus",     state: "OH", zipcode: "43085", role: "user"   }
];

