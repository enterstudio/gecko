/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

// Verify RDM closes synchronously in the case of the "beforeunload" event.

const TEST_URL = "http://example.com/";
add_task(function* () {
  let tab = yield addTab(TEST_URL);

  let { ui } = yield openRDM(tab);

  closeRDM(tab, {
    reason: "beforeunload",
  });

  // This flag is set at the end of `ResponsiveUI.destroy`.  If it is true
  // without yielding on `closeRDM` above, then we must have closed
  // synchronously.
  is(ui.destroyed, true, "RDM closed synchronously");

  yield removeTab(tab);
});
