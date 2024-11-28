import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleClick = () => {
    navigate("/bookings");
  };

  useEffect(() => {
    if (location.state && location.state.appointment) {
      setSelectedAppointment(location.state.appointment);
    }
  }, [location.state]);

  const {
    _id,
    type,
    age,
    gender,
    problem,
    problemDescription,
    referral,
    labs,
    status,
    appointmentDate,
    createdBy,
    totalAmount,
    paymentStatus,
    ticket,
    franchise,
    commission,
    createdAt,
    updatedAt,
    healthProblem,
    address,
    visitType,
  } = selectedAppointment || {};

  const Card = ({ title, children }) => (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-4">
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-100">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );

  const InfoItem = ({ label, value }) => (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );

  const Badge = ({ children, color }) => (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {children}
    </span>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
      <button
        onClick={handleClick}
        className="p-2 rounded border bg-gray-200 block ml-auto"
      >
        Go Back
      </button>
      {selectedAppointment ? (
        <div className="space-y-4">
          <Card title="Appointment Information">
            <div className="grid grid-cols-1 gap-2">
              <InfoItem label="ID" value={_id} />
              <InfoItem label="Type" value={type} />
              <InfoItem
                label="Approvement"
                value={
                  <Badge
                    color={
                      status === "Approve"
                        ? "bg-green-100 text-green-700"
                        : status === "Reject"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {status}
                  </Badge>
                }
              />
              <InfoItem
                label="Date"
                value={new Date(appointmentDate).toLocaleDateString()}
              />
              <InfoItem label="Ticket" value={ticket} />
              <InfoItem
                label="Created"
                value={new Date(createdAt).toLocaleDateString()}
              />
              <InfoItem
                label="Updated"
                value={new Date(updatedAt).toLocaleDateString()}
              />
            </div>
          </Card>

          <Card title="Patient Information">
            <div className="grid grid-cols-1 gap-2">
              <InfoItem label="Age" value={age} />
              <InfoItem label="Gender" value={gender} />
              <InfoItem label="Problem" value={problem} />
            </div>
            <div className="mt-2 text-sm">
              <p className="text-gray-500 font-medium">Description:</p>
              <p className="text-gray-700 mt-1">{problemDescription}</p>
            </div>
          </Card>
          <Card title="Health Problem Details">
            {healthProblem && healthProblem.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {healthProblem.map((problem, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <h4 className="font-medium mb-1 text-gray-600 text-sm">
                      Problem {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <InfoItem label="Name" value={problem.name} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No health problems listed.</p>
            )}
          </Card>

          {createdBy && (
            <Card title="User Information">
              <div className="grid grid-cols-1 gap-2">
                <InfoItem label="Name" value={createdBy.name} />
                <InfoItem label="Email" value={createdBy.email} />
                <InfoItem label="Mobile" value={createdBy.mobile} />
              </div>
            </Card>
          )}
          {address && (
            <Card title="Address Information">
              <div className="grid grid-cols-1 gap-2">
                <InfoItem label="Address" value={address.address} />
                <InfoItem label="City" value={address.city} />
                <InfoItem label="State" value={address.state} />
                <InfoItem label="Pin Code" value={address.pinCode} />
              </div>
            </Card>
          )}

          {referral && (
            <Card title="Referral Information">
              <div className="grid grid-cols-1 gap-2">
                <InfoItem label="Name" value={referral.name} />
                <InfoItem label="Email" value={referral.email} />
                <InfoItem label="Contact" value={referral.contact} />

                <InfoItem
                  label="Commission"
                  value={`${referral.commissionPercentage}%`}
                />
              </div>
            </Card>
          )}

          {labs && labs.lab && (
            <Card title="Lab Information">
              <div className="grid grid-cols-1 gap-2">
                <InfoItem label="Name" value={labs.lab.name} />
                <InfoItem label="Contact" value={labs.lab.contactNumber} />
                <InfoItem label="Email" value={labs.lab.email} />
              </div>
            </Card>
          )}
          {visitType && (
            <Card title="Visit Type">
              <div className="grid grid-cols-1 gap-2">
                <InfoItem label="Name" value={visitType} />
              </div>
            </Card>
          )}

          {labs && labs.tests && labs.tests.length > 0 && (
            <Card title="Test Details">
              {labs.tests.map((testDetail, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <h4 className="font-medium mb-1 text-gray-600 text-sm">
                    Test {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <InfoItem
                      label="Description"
                      value={testDetail.test.description}
                    />
                    <InfoItem
                      label="Category"
                      value={testDetail.test.labCategory.name}
                    />
                    <InfoItem
                      label="Price"
                      value={`${testDetail.test.price} INR`}
                    />
                    <InfoItem label="Status" value={testDetail.status} />
                  </div>
                </div>
              ))}
            </Card>
          )}

          <Card title="Payment and Franchise Details">
            <div className="grid grid-cols-1 gap-2">
              <InfoItem label="Total Amount" value={`${totalAmount} INR`} />
              <InfoItem label="Payment Status" value={paymentStatus} />
            </div>
            {franchise && (
              <>
                <div className="my-2 border-t border-gray-100"></div>
                <h4 className="font-medium mb-1 text-gray-600 text-sm">
                  Franchise Information
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  <InfoItem label="Name" value={franchise.name} />
                  <InfoItem label="Contact" value={franchise.contactNumber} />
                  <InfoItem label="Email" value={franchise.email} />
                </div>
              </>
            )}
            <div className="mt-2 border-t border-gray-100 pt-2">
              <InfoItem
                label="Commission (Super Admin to Franchise)"
                value={`${commission.superAdminToFranchise}%`}
              />
            </div>
          </Card>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-4">
          <p className="text-gray-500">Loading booking details...</p>
        </div>
      )}
    </div>
  );
};

export default BookingsDetails;
