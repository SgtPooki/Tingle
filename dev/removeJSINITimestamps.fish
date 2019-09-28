#!/usr/bin/env fish

set SDIR "$PWD/"(dirname (status filename));

set jsINIFile "$SDIR/../javascript.ini";

if test ! -e "$jsINIFile"
  echo "Error: Javascript INI file does not exist; exiting...";
  exit;
end

sed -i -r 's|^([^=]+=)[[:digit:]]+$|\1|g' "$jsINIFile";
