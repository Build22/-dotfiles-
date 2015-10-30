(function() {
  var CompositeDisposable, ERB_BLOCKS, ERB_CLOSER_REGEX, ERB_OPENER_REGEX, ERB_REGEX, Range;

  Range = require('atom').Range;

  CompositeDisposable = require('atom').CompositeDisposable;

  ERB_BLOCKS = [['<%=', '%>'], ['<%', '%>'], ['<%#', '%>']];

  ERB_REGEX = '<%(=?|-?|#?)\s{2}(-?)%>';

  ERB_OPENER_REGEX = '<%[\\=\\#]?';

  ERB_CLOSER_REGEX = "%>";

  module.exports = {
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', 'rails-snippets:toggleErb', (function(_this) {
        return function() {
          return _this.toggleErb();
        };
      })(this)));
    },
    toggleErb: function() {
      var delegate, editor, hasTextSelected, selectedText, selection, _i, _len, _ref, _results;
      editor = atom.workspace.getActiveTextEditor();
      _ref = editor.getSelections();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i += 1) {
        selection = _ref[_i];
        hasTextSelected = !selection.isEmpty();
        selectedText = selection.getText();
        delegate = this;
        _results.push(editor.transact(function() {
          var closer, currentCursor, opener, textToRestoreRange, _ref1;
          selection.deleteSelectedText();
          currentCursor = selection.cursor;
          _ref1 = delegate.findSorroundingBlocks(editor, currentCursor), opener = _ref1[0], closer = _ref1[1];
          if ((opener != null) && (closer != null)) {
            delegate.replaceErbBlock(editor, opener, closer, currentCursor);
          } else {
            delegate.insertErbBlock(editor, currentCursor);
          }
          if (hasTextSelected) {
            textToRestoreRange = editor.getBuffer().insert(currentCursor.getBufferPosition(), selectedText);
            return selection.setBufferRange(textToRestoreRange);
          }
        }));
      }
      return _results;
    },
    findSorroundingBlocks: function(editor, currentCursor) {
      var closer, containingLine, foundClosers, foundOpeners, leftRange, opener, rightRange;
      opener = closer = null;
      containingLine = currentCursor.getCurrentLineBufferRange();
      leftRange = new Range(containingLine.start, currentCursor.getBufferPosition());
      rightRange = new Range(currentCursor.getBufferPosition(), containingLine.end);
      foundOpeners = [];
      editor.getBuffer().scanInRange(new RegExp(ERB_OPENER_REGEX, 'g'), leftRange, function(result) {
        return foundOpeners.push(result.range);
      });
      if (foundOpeners) {
        opener = foundOpeners[foundOpeners.length - 1];
      }
      foundClosers = [];
      editor.getBuffer().scanInRange(new RegExp(ERB_CLOSER_REGEX, 'g'), rightRange, function(result) {
        return foundClosers.push(result.range);
      });
      if (foundClosers) {
        closer = foundClosers[0];
      }
      return [opener, closer];
    },
    insertErbBlock: function(editor, currentCursor) {
      var closingBlock, defaultBlock, desiredPosition, openingTag;
      defaultBlock = ERB_BLOCKS[0];
      desiredPosition = null;
      openingTag = editor.getBuffer().insert(currentCursor.getBufferPosition(), defaultBlock[0] + ' ');
      desiredPosition = currentCursor.getBufferPosition();
      closingBlock = editor.getBuffer().insert(currentCursor.getBufferPosition(), ' ' + defaultBlock[1]);
      return currentCursor.setBufferPosition(desiredPosition);
    },
    replaceErbBlock: function(editor, opener, closer, currentCursor) {
      var closingBracket, nextBlock, openingBracket;
      openingBracket = editor.getBuffer().getTextInRange(opener);
      closingBracket = editor.getBuffer().getTextInRange(closer);
      nextBlock = this.getNextErbBlock(editor, openingBracket, closingBracket);
      editor.getBuffer().setTextInRange(closer, nextBlock[1]);
      return editor.getBuffer().setTextInRange(opener, nextBlock[0]);
    },
    getNextErbBlock: function(editor, openingBracket, closingBracket) {
      var block, i, _i, _len;
      for (i = _i = 0, _len = ERB_BLOCKS.length; _i < _len; i = ++_i) {
        block = ERB_BLOCKS[i];
        if (JSON.stringify([openingBracket, closingBracket]) === JSON.stringify(block)) {
          if ((i + 1) >= ERB_BLOCKS.length) {
            return ERB_BLOCKS[0];
          } else {
            return ERB_BLOCKS[i + 1];
          }
        }
      }
      return ERB_BLOCKS[0];
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2phZGUvLmRvdGZpbGVzL2F0b20uc3ltbGluay9wYWNrYWdlcy9yYWlscy1zbmlwcGV0cy9saWIvcmFpbHMtc25pcHBldHMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLHFGQUFBOztBQUFBLEVBQUMsUUFBUyxPQUFBLENBQVEsTUFBUixFQUFULEtBQUQsQ0FBQTs7QUFBQSxFQUNDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFERCxDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLENBQUMsQ0FBQyxLQUFELEVBQVEsSUFBUixDQUFELEVBQWdCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBaEIsRUFBOEIsQ0FBQyxLQUFELEVBQVEsSUFBUixDQUE5QixDQUpiLENBQUE7O0FBQUEsRUFLQSxTQUFBLEdBQVkseUJBTFosQ0FBQTs7QUFBQSxFQU9BLGdCQUFBLEdBQW1CLGFBUG5CLENBQUE7O0FBQUEsRUFTQSxnQkFBQSxHQUFtQixJQVRuQixDQUFBOztBQUFBLEVBV0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO2FBQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0MsMEJBQXBDLEVBQWdFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFNBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEUsQ0FBbkIsRUFGUTtJQUFBLENBQVY7QUFBQSxJQUlBLFNBQUEsRUFBVyxTQUFBLEdBQUE7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

//# sourceURL=/Users/jade/.dotfiles/atom.symlink/packages/rails-snippets/lib/rails-snippets.coffee
