function NavBarPreview({ activeSection }) {
  return (
    <div>
      {activeSection === "allSongs" && (
        <div>
          {/* Show the first 5 songs here using map? and slice of state */}
        </div>
      )}
    </div>
  );
}

export default NavBarPreview;
