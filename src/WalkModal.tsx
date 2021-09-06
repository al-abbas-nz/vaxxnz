import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import "./App.css";
import { WalkinLocation } from "./getData";
import { ModalGrid } from "./VaxComponents";
import { NoticeList, NoticeListItem } from "./NoticeList";
import { FunctionComponent } from "react";

type Props = {
  clearSelectedLocation: () => void;
  location?: WalkinLocation;
};

const CancelBookingNotice: FunctionComponent<{ className: string }> = ({
  className,
}) => (
  <div className={`cancel-booking-notice ${className}`}>
    <h4>Please don't double-book</h4>
    <p>
      Remember to cancel your original booking if you have one at{" "}
      <a href="https://bookmyvaccine.nz" target="_blank" rel="noreferrer">
        bookmyvaccine.nz
      </a>
    </p>
  </div>
);

const WalkModal = ({ clearSelectedLocation, location }: Props) => {
  const close = () => clearSelectedLocation();
  if (location == null) {
    return null;
  }
  const telephone = location.telephone.replace(/\[.*\]/g, "");

  return (
    <Modal
      onClose={close}
      isOpen={!!location}
      unstable_ModalBackdropScroll={true}
      size="full"
      overrides={{
        Root: { style: { zIndex: 1500 } },
        Dialog: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            padding: "1.5rem",
            maxWidth: "860px",
          },
        },
      }}
    >
      <ModalGrid className={"modal-container"}>
        <div>
          <h1
            style={{
              marginBottom: "1rem",
            }}
          >
            {location.name}
          </h1>

          <p>{location.address}</p>

          <CancelBookingNotice className="mobile" />

          <Button
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "1.5rem",
                  marginRight: 0,
                  marginBottom: "0.5rem",
                  marginLeft: 0,
                },
              },
            }}
            kind={KIND.primary}
            onClick={() => {
              // Also close the modal to avoid confusing stuff
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
              );
              close();
            }}
          >
            Get Directions
          </Button>

          <Button
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "0.5rem",
                  marginRight: 0,
                  marginBottom: "0.5rem",
                  marginLeft: 0,
                },
              },
            }}
            kind={KIND.secondary}
            onClick={close}
          >
            Cancel
          </Button>
        </div>
        <div style={{ height: "100%" }}>
          <CancelBookingNotice className="desktop" />
          {/* <p
                style={{
                    marginTop: "1rem",
                    paddingTop: "1.25rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                    fontSize: "1.25rem",
                    borderTop: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "1.5rem",
                    lineHeight: "1.5",
                }}
            >
                {location.instructionLis.map((instruction, index) => {
                    return (
                        <Fragment key={index}>
                            {instruction}
                            <br />
                        </Fragment>
                    );
                })}
            </p> */}

          {telephone && (
            <p
              style={{
                marginBottom: "0.5rem",
                marginRight: "1rem",
                fontSize: "1.25rem",

                paddingTop: "1rem",
                lineHeight: "1.5",
              }}
            >
              <h3> Phone</h3>

              <a href={`tel:${telephone}`}>{telephone}</a>
            </p>
          )}

          {location.opennningHours.schedule && (
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
                marginRight: "1rem",
                borderBottom: "1px solid lightgray",
                borderTop: "1px solid lightgray",
                paddingBottom: "1.5rem",
                paddingTop: "1rem",
                lineHeight: "1.5",
              }}
            >
              <h3> Hours</h3>
              {Object.keys(location.opennningHours.schedule).map(
                (openDate, index) => {
                  return (
                    <p key={index}>
                      {openDate} {location.opennningHours.schedule[openDate]}
                      <br />
                    </p>
                  );
                }
              )}
            </div>
          )}

          {Object.entries(location.opennningHours.exceptions).map(
            ([key, value], index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginTop: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <h3>{key}</h3>

                  <p key={index}>{value}</p>
                </div>
              );
            }
          )}
          {location.opennningHours.notesHtml.map((noteHtml, index) => {
            return (
              <div key={index} style={{ marginTop: "1rem" }}>
                <small
                  key={index}
                  dangerouslySetInnerHTML={{ __html: noteHtml }}
                ></small>
              </div>
            );
          })}
          <hr />
          <NoticeList>
            <hr />
            <NoticeListItem title="Availability Is Not Guaranteed">
              There might be a long queue when you arrive.
            </NoticeListItem>
          </NoticeList>
        </div>
      </ModalGrid>
    </Modal>
  );
};

export default WalkModal;