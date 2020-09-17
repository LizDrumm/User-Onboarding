
describe('Quotes app',()=>{
beforeEach(()=>{cy.visit('http://localhost:3000')
})

it('sanity check make sure tests work', ()=>{
    //expect is an assertion
    //there can be several assertions per test
    //what kind of things can we expect?
    expect(1+2).to.equal(3) //strict ===
    expect(2+2).not.to.equal(5)//strict====
    expect({}).to.eql({})////not ==== (strict)
})

//Element selector functions
const firstName = () => cy.get("input[name=first_name]");
const lastName = () => cy.get("input[name=last_name]");
const email = () => cy.get("input[name=email]");
const password = () => cy.get("input[name=password]");
const tos = () => cy.get('[type="checkbox"]');
const submit = () => cy.get("button[id='button']");


//make sure elements exist
it("check the elemets are showing", () => {
  firstName().should("exist");
  lastName().should("exist");
  email().should("exist");
  password().should("exist");
  tos().should("exist");
  submit().should("exist");
});

//select elements and type in the inputs 
it("check can type in the inputs", () => {
  firstName()
    .should("have.value", "")
    .type("Liz")
    .should("have.value", "Liz");

  lastName()
    .should("have.value", "")
    .type("Drumm")
    .should("have.value", "Drumm");

  email()
    .should("have.value", "")
    .type("fakeemail@gmail.com")
    .should("have.value", "fakeemail@gmail.com");

  password()
    .should("have.value", "")
    .type("1234asdf")
    .should("have.value", "1234asdf");
//check tos box 
  tos().check();

//click submit 
  submit().click();
});

//check for validation if an input is left empty
it("check errors", () => {
  firstName().should("have.value", "").type("Li").should("have.value", "Li");

  lastName().should("have.value", "").type("Dr").should("have.value", "Dr");

  email()
    .should("have.value", "")
    .type("fakeemail.com")
    .should("have.value", "fakeemail.com");

  password()
    .should("have.value", "")
    .type("12")
    .should("have.value", "12");

  
tos().uncheck();

  submit().click({force: true});
});
});