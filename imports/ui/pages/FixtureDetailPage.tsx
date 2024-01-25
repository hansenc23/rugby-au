import React from "react";
import { useParams } from "react-router-dom";
import { useFixtureById } from "../hooks/useFixtureData";
import { Fixture } from "../../db/FixturesCollection";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { EditFixtureForm } from "../components/EditFixtureForm";
export const FixtureDetailPage = () => {
  const { id } = useParams<{ id: string | undefined }>(); // Provide a default value for id

  const fixture = useFixtureById(id || "");
  const { isModalOpen, openModal, closeModal } = useModal();

  const renderFixtureDetail = (fixture: Fixture) => {
    const { away_team, competition_name, fixture_datetime, fixture_round, home_team, readOnly, season } = fixture;
    return (
      <>
        <div>
          <h1 className="text-2xl py-3">
            {competition_name} {season}
          </h1>
          <h1 className="text-3xl py-3 font-semibold">
            {home_team} vs {away_team}
          </h1>
          <p className="mt-3 py-2 ">Round: {fixture_round}</p>
          <p className="py-2">Duration: {fixture_datetime}</p>
        </div>
        {!readOnly ? (
          <>
            <button
              onClick={openModal}
              className="bg-pink-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Edit Fixture
            </button>
            <Modal title={"Edit Fixture"} isModalOpen={isModalOpen} closeModal={closeModal}>
              <EditFixtureForm fixture={fixture} />
            </Modal>
          </>
        ) : null}
      </>
    );
  };
  return <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-8">{fixture ? renderFixtureDetail(fixture) : null}</div>;
};
