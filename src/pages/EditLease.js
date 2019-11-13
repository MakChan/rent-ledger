import React from "react";

function EditLease({ match }) {
  return (
    <div>
      <h2>Incomplete</h2>
      EditLease - {match.params.leaseId}
    </div>
  );
}

export default EditLease;
