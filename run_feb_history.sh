#!/bin/bash
set -e
cd /Users/himanshugulhane/Desktop/NewsPulse

echo "========================================="
echo "  NewsPulse February 2026 History Gen"
echo "========================================="
echo ""

# Store current HEAD to rebase later
CURRENT_HEAD=$(git rev-parse HEAD)
echo "Current HEAD: $CURRENT_HEAD"

# Create an orphan-style approach: work on a temp branch
git checkout -b temp-feb-history

# Find the very first commit to rebase onto
FIRST_COMMIT=$(git rev-list --max-parents=0 HEAD)
echo "First commit: $FIRST_COMMIT"

echo ""
echo ">>> Running Part 1 (Feb 02-07)..."
bash gen_feb_history.sh

echo ">>> Running Part 2 (Feb 08-11)..."
bash gen_feb_part2.sh

echo ">>> Running Part 3 (Feb 12-14)..."
bash gen_feb_part3.sh

echo ">>> Running Part 4 (Feb 15-17)..."
bash gen_feb_part4.sh

echo ">>> Running Part 5 (Feb 18-20)..."
bash gen_feb_part5.sh

echo ">>> Running Part 6 (Feb 21-22)..."
bash gen_feb_part6.sh

echo ">>> Running Part 7 (Feb 23-27)..."
bash gen_feb_part7.sh

echo ">>> Running Part 8 (Feb 28)..."
bash gen_feb_part8.sh

echo ""
echo "========================================="
echo "  All February commits created!"
echo "========================================="

# Count the new commits
NEW_COMMITS=$(git rev-list $CURRENT_HEAD..HEAD --count)
echo "New commits added: $NEW_COMMITS"

# Now merge back to main
git checkout main
git merge temp-feb-history --no-edit
git branch -d temp-feb-history

echo ""
echo "Merged to main. Ready to push."
echo "Run: git push origin main"
echo "========================================="
