// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email){
            this.email=email;
            this.name=name;
            this.id=id;
            this.role = 'Employee';
    }
    getEmail(){
        return this.email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getRole(){
        return this.role;
    }
}

module.exports = Employee;