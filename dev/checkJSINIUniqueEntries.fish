#!/usr/bin/env fish

set SDIR "$PWD/"(dirname (status filename));

set jsINIFile "$SDIR/../javascript.ini";

if test ! -e "$jsINIFile"
  echo "Error: Javascript INI file does not exist; exiting...";
  exit;
end

cat "$jsINIFile" | \
  sed -r 's|^([^=]+)=|\1|g' | \
  sort | uniq -c | grep -Ev '\s+1 ' \
;
