'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { set, unset } from 'sanity';

const MAX_ROWS = 20;

function generateKey(index) {
  return `spec-${index}-${Math.random().toString(36).substring(2, 9)}`;
}

export function SpecificationsGridInput(props) {
  const { value = [], onChange, readOnly } = props;

  // Initialize a fixed 20-row state
  const [rows, setRows] = useState(() => {
    const initial = [];
    for (let i = 0; i < MAX_ROWS; i++) {
      const existing = value && value[i];
      initial.push({
        _key: existing?._key || generateKey(i),
        label: existing?.label || '',
        value: existing?.value || '',
      });
    }
    return initial;
  });

  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const feedbackTimeoutRef = useRef(null);

  // Sync state if external value changes (e.g. discard changes or external update)
  useEffect(() => {
    setRows((prevRows) => {
      const next = [];
      for (let i = 0; i < MAX_ROWS; i++) {
        const existing = value && value[i];
        next.push({
          _key: existing?._key || prevRows[i]?._key || generateKey(i),
          label: existing?.label || '',
          value: existing?.value || '',
        });
      }
      return next;
    });
  }, [value]);

  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackMsg('');
    }, 4000);
  };

  // Commit non-empty rows to Sanity
  const commitRows = useCallback(
    (newRows) => {
      if (readOnly) return;
      // Filter out empty rows: only rows with non-empty label or value get saved
      const activeRows = newRows
        .filter((r) => (r.label && r.label.trim()) || (r.value && r.value.trim()))
        .map((r, idx) => ({
          _type: 'specification',
          _key: r._key || generateKey(idx),
          label: (r.label || '').trim(),
          value: (r.value || '').trim(),
        }));

      if (activeRows.length > 0) {
        onChange(set(activeRows));
      } else {
        onChange(unset());
      }
    },
    [onChange, readOnly]
  );

  const handleCellChange = (index, field, newValue) => {
    const updated = [...rows];
    updated[index] = {
      ...updated[index],
      [field]: newValue,
    };
    setRows(updated);
    commitRows(updated);
  };

  // Parse clipboard text from Excel / Google Sheets
  const parseClipboardData = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const parsed = [];
    for (let i = 0; i < lines.length && parsed.length < MAX_ROWS; i++) {
      const line = lines[i];
      let col1 = '';
      let col2 = '';

      if (line.includes('\t')) {
        const parts = line.split('\t');
        col1 = parts[0]?.trim() || '';
        col2 = parts.slice(1).join('\t').trim() || '';
      } else if (line.includes(':')) {
        const parts = line.split(':');
        col1 = parts[0]?.trim() || '';
        col2 = parts.slice(1).join(':').trim() || '';
      } else if (line.includes(',')) {
        const parts = line.split(',');
        col1 = parts[0]?.trim() || '';
        col2 = parts.slice(1).join(',').trim() || '';
      } else {
        col1 = line;
        col2 = '';
      }

      parsed.push({ col1, col2 });
    }
    return parsed;
  };

  // Direct paste into any cell in the table
  const handleCellPaste = (e, startIndex, targetField) => {
    const clipboardText = e.clipboardData?.getData('text/plain') || '';

    // If paste is multi-line or tab-separated, handle as Excel data
    if (clipboardText.includes('\t') || clipboardText.includes('\n')) {
      e.preventDefault();
      const parsedItems = parseClipboardData(clipboardText);

      if (parsedItems.length === 0) return;

      const updated = [...rows];
      parsedItems.forEach((item, offset) => {
        const targetRowIndex = startIndex + offset;
        if (targetRowIndex < MAX_ROWS) {
          updated[targetRowIndex] = {
            ...updated[targetRowIndex],
            label: item.col1,
            value: item.col2,
          };
        }
      });

      setRows(updated);
      commitRows(updated);
      showNotification(`✓ Pasted ${parsedItems.length} specification rows from Excel!`);
    }
  };

  // Apply from quick paste modal
  const handleApplyPasteModal = () => {
    if (!pasteText.trim()) return;

    const parsedItems = parseClipboardData(pasteText);
    if (parsedItems.length === 0) return;

    const updated = [];
    for (let i = 0; i < MAX_ROWS; i++) {
      const item = parsedItems[i];
      updated.push({
        _key: generateKey(i),
        label: item ? item.col1 : '',
        value: item ? item.col2 : '',
      });
    }

    setRows(updated);
    commitRows(updated);
    setShowPasteModal(false);
    setPasteText('');
    showNotification(`✓ Successfully applied ${parsedItems.length} rows from Excel!`);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all 20 specification rows?')) {
      const cleared = [];
      for (let i = 0; i < MAX_ROWS; i++) {
        cleared.push({
          _key: generateKey(i),
          label: '',
          value: '',
        });
      }
      setRows(cleared);
      commitRows(cleared);
      showNotification('Table cleared. All empty rows will be excluded on the website.');
    }
  };

  const handleFillStandardVehicleTemplate = () => {
    const template = [
      { col1: 'Make / Model', col2: '' },
      { col1: 'Year of Manufacture', col2: '' },
      { col1: 'Condition / Odometer', col2: 'Inspected / Certified' },
      { col1: 'Engine Type', col2: 'Turbocharged Diesel' },
      { col1: 'Max Power', col2: '' },
      { col1: 'Transmission', col2: 'Manual, Multi-Speed' },
      { col1: 'Drive Configuration', col2: '4x2 / 6x4' },
      { col1: 'Gross Vehicle Weight (GVW)', col2: '' },
      { col1: 'Payload Capacity', col2: '' },
      { col1: 'Fuel Tank Capacity', col2: '' },
      { col1: 'Braking System', col2: 'Air Brakes with ABS' },
      { col1: 'Wheelbase', col2: '' },
      { col1: 'Tyre Size & Condition', col2: 'Radial — 85%+ Tread' },
      { col1: 'Cabin Configuration', col2: 'Day / Sleeper Cab' },
      { col1: 'Air Conditioning', col2: 'Fitted' },
      { col1: 'Emission Standard', col2: 'Euro III / Euro IV' },
      { col1: 'Export Readiness', col2: 'Full PDI & Clean Title' },
      { col1: 'Shipping Option', col2: 'Ro-Ro / Containerized' },
    ];

    const updated = [...rows];
    template.forEach((item, i) => {
      if (i < MAX_ROWS) {
        updated[i] = {
          ...updated[i],
          label: item.col1,
          value: updated[i]?.value || item.col2,
        };
      }
    });

    setRows(updated);
    commitRows(updated);
    showNotification('Loaded standard commercial vehicle specification template!');
  };

  const activeCount = rows.filter(
    (r) => (r.label && r.label.trim()) || (r.value && r.value.trim())
  ).length;

  return (
    <div
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        background: '#ffffff',
        border: '1px solid #dcdde1',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '8px',
      }}
    >
      {/* Header & Tool Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '14px',
          paddingBottom: '12px',
          borderBottom: '1px solid #eee',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1b2027',
                letterSpacing: '-0.01em',
              }}
            >
              2-Column Detailed Specifications Grid
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '4px',
                background: activeCount > 0 ? '#e6f4ea' : '#f1f3f4',
                color: activeCount > 0 ? '#137333' : '#5f6368',
                border: `1px solid ${activeCount > 0 ? '#ceead6' : '#dadce0'}`,
              }}
            >
              {activeCount} of {MAX_ROWS} Rows Active
            </span>
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#5f6368',
              margin: '4px 0 0 0',
            }}
          >
            Copy 2 columns from Excel and paste directly into any cell, or use the paste button below.
            <strong style={{ color: '#d93025' }}> Empty rows will be excluded on the web page.</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setShowPasteModal(true)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              background: '#e8a23d',
              color: '#1b2027',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            📋 Paste from Excel / Sheets
          </button>

          <button
            type="button"
            onClick={handleFillStandardVehicleTemplate}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 500,
              background: '#f8f9fa',
              color: '#3c4043',
              border: '1px solid #dadce0',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            title="Pre-fills standard vehicle labels (Make, Year, Engine, GVW...)"
          >
            ✨ Vehicle Template
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            style={{
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 500,
              background: '#fff',
              color: '#d93025',
              border: '1px solid #f28b82',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {feedbackMsg && (
        <div
          style={{
            background: '#e6f4ea',
            color: '#137333',
            border: '1px solid #ceead6',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{feedbackMsg}</span>
          <button
            type="button"
            onClick={() => setFeedbackMsg('')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#137333',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Quick Paste Modal / Drawer */}
      {showPasteModal && (
        <div
          style={{
            background: '#f8f9fa',
            border: '1px solid #e8a23d',
            borderRadius: '8px',
            padding: '14px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <strong style={{ fontSize: '13px', color: '#202124' }}>
              📋 Paste Excel / Google Sheets Data
            </strong>
            <button
              type="button"
              onClick={() => setShowPasteModal(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#5f6368',
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontSize: '11px', color: '#5f6368', margin: '0 0 8px 0' }}>
            Select 2 columns in Excel (Column 1 = Label, Column 2 = Value), copy (`Ctrl+C`), and paste
            (`Ctrl+V`) into the box below:
          </p>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Engine&#9;5.8L Cummins 160 HP&#10;Transmission&#9;Manual 6-Speed&#10;Fuel Type&#9;Diesel"
            rows={5}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '8px 10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              background: '#fff',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setShowPasteModal(false)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                background: '#fff',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyPasteModal}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                background: '#e8a23d',
                color: '#1b2027',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Apply to 20 Rows
            </button>
          </div>
        </div>
      )}

      {/* 20-Row Grid Table */}
      <div
        style={{
          maxHeight: '520px',
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr
              style={{
                background: '#f8f9fa',
                borderBottom: '2px solid #dadce0',
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
            >
              <th
                style={{
                  width: '44px',
                  padding: '8px 6px',
                  textAlign: 'center',
                  color: '#5f6368',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                #
              </th>
              <th
                style={{
                  width: '45%',
                  padding: '8px 12px',
                  color: '#202124',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Column 1: Specification Label
              </th>
              <th
                style={{
                  width: '50%',
                  padding: '8px 12px',
                  color: '#202124',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Column 2: Value / Details
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const hasData = Boolean(
                (row.label && row.label.trim()) || (row.value && row.value.trim())
              );

              return (
                <tr
                  key={row._key || index}
                  style={{
                    borderBottom: '1px solid #f1f3f4',
                    background: hasData ? '#fafafa' : '#ffffff',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {/* Row Number */}
                  <td
                    style={{
                      padding: '6px 4px',
                      textAlign: 'center',
                      color: hasData ? '#1b2027' : '#9aa0a6',
                      fontWeight: hasData ? 700 : 500,
                      background: hasData ? '#f1f3f4' : 'transparent',
                      borderRight: '1px solid #eee',
                      userSelect: 'none',
                    }}
                  >
                    {index + 1}
                  </td>

                  {/* Column 1: Label */}
                  <td style={{ padding: '4px 6px', borderRight: '1px solid #eee' }}>
                    <input
                      type="text"
                      disabled={readOnly}
                      value={row.label || ''}
                      placeholder={index === 0 ? 'e.g. Make / Model' : `Row ${index + 1} Label`}
                      onChange={(e) => handleCellChange(index, 'label', e.target.value)}
                      onPaste={(e) => handleCellPaste(e, index, 'label')}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '6px 8px',
                        fontSize: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        outline: 'none',
                        background: hasData ? '#fff' : '#fafafa',
                        color: '#202124',
                        fontWeight: 500,
                      }}
                    />
                  </td>

                  {/* Column 2: Value */}
                  <td style={{ padding: '4px 6px' }}>
                    <input
                      type="text"
                      disabled={readOnly}
                      value={row.value || ''}
                      placeholder={index === 0 ? 'e.g. Tata LPT 1613' : `Row ${index + 1} Value`}
                      onChange={(e) => handleCellChange(index, 'value', e.target.value)}
                      onPaste={(e) => handleCellPaste(e, index, 'value')}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '6px 8px',
                        fontSize: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        outline: 'none',
                        background: hasData ? '#fff' : '#fafafa',
                        color: '#202124',
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Instructions */}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#5f6368',
        }}
      >
        <span>
          💡 <strong>Tip:</strong> Press `Ctrl+V` directly inside any cell to paste multi-row Excel
          data starting from that row.
        </span>
        <span style={{ fontStyle: 'italic' }}>
          {MAX_ROWS - activeCount} empty row{MAX_ROWS - activeCount === 1 ? '' : 's'} will not appear on the website
        </span>
      </div>
    </div>
  );
}

export default SpecificationsGridInput;
