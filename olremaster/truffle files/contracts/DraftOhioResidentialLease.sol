pragma solidity ^0.5.0;

contract DraftOhioResidentialLease {
    string public Landlord_Name;
    string public Tenant_Name;
    string public Property_Name;
    uint256 public Lease_Commencement_Date;
    uint256 public Lease_Termination_Date;
    string public Rent_Due_Date;
    string public Rent_Increase_Date;
    uint public Security_Deposit_Amount;
    string public Premises_Description;
    uint public Daily_Animal_Restriction_Violation_Fee;
    string public Landlord_Notice_Address;
    uint256 public Effective_Date;

    function recordContract(string memory lname, string memory tname,
string memory pname, uint256 lcdate, uint256 ltdate,
string memory rdue, string memory rinc, uint secdep,
string memory premdesc, uint anfee,
string memory ladd, uint256 effdate
    ) public {
        Landlord_Name = lname;
        Tenant_Name = tname;
        Property_Name = pname; 
        Lease_Commencement_Date = lcdate;
        Lease_Termination_Date = ltdate;
        Rent_Due_Date = rdue;
        Rent_Increase_Date = rinc;
        Security_Deposit_Amount = secdep;
        Premises_Description = premdesc;
        Daily_Animal_Restriction_Violation_Fee = anfee;
        Landlord_Notice_Address = ladd;
        Effective_Date = effdate;
    }
}

