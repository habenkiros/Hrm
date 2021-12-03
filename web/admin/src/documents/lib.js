/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

import AdapterBase from '../../../api/AdapterBase';

/**
 * DocumentAdapter
 */

class DocumentAdapter extends AdapterBase {
  getDataMapping() {
    return [
      'id',
      'name',
      'details',
    ];
  }

  getHeaders() {
    return [
      { sTitle: 'ID', bVisible: false },
      { sTitle: 'Name' },
      { sTitle: 'Details' },
    ];
  }

  getFormFields() {
    return [
      ['id', { label: 'ID', type: 'hidden' }],
      ['name', { label: 'Name', type: 'text', validation: '' }],
      ['expire_notification', { label: 'Notify Expiry', type: 'select', source: [['Yes', 'Yes'], ['No', 'No']] }],
      ['expire_notification_month', { label: 'Notify Expiry Before One Month', type: 'select', source: [['Yes', 'Yes'], ['No', 'No']] }],
      ['expire_notification_week', { label: 'Notify Expiry Before One Week', type: 'select', source: [['Yes', 'Yes'], ['No', 'No']] }],
      ['expire_notification_day', { label: 'Notify Expiry Before One Day', type: 'select', source: [['Yes', 'Yes'], ['No', 'No']] }],
      ['share_with_employee', { label: 'Share with Employee', type: 'select', source: [['Yes', 'Yes'], ['No', 'No']] }],
      // [ "sign", {"label":"Require Signature","type":"select","source":[["Yes","Yes"],["No","No"]]}],
      // [ "sign", {"label":"Require Signature","type":"select","source":[["Yes","Yes"],["No","No"]]}],
      // [ "sign_label", {"label":"Signature Description","type":"textarea","validation":"none"}],
      ['details', { label: 'Details', type: 'textarea', validation: 'none' }],
    ];
  }

  getHelpLink() {
    return 'https://icehrm.gitbook.io/icehrm/training-and-reviews/document-management';
  }
}


/**
 * CompanyDocumentAdapter
 */

class CompanyDocumentAdapter extends AdapterBase {
  getDataMapping() {
    return [
      'id',
      'name',
      'details',
      'status',
    ];
  }

  getHeaders() {
    return [
      { sTitle: 'ID', bVisible: false },
      { sTitle: 'Name' },
      { sTitle: 'Details' },
      { sTitle: 'Status' },
    ];
  }

  getFormFields() {
    return [
      ['id', { label: 'ID', type: 'hidden' }],
      ['name', { label: 'Name', type: 'text', validation: '' }],
      ['details', { label: 'Details', type: 'textarea', validation: 'none' }],
      ['status', { label: 'Status', type: 'select', source: [['Active', 'Active'], ['Inactive', 'Inactive'], ['Draft', 'Draft']] }],
      ['attachment', { label: 'Attachment', type: 'fileupload' }],
      [
        'share_departments',
        {
          label: 'Share Departments',
          type: 'select2multi',
          'allow-null': true,
          'null-label': 'All Departments',
          'remote-source': ['CompanyStructure', 'id', 'title'],
          help: 'This document will be visible to employees from selected department. If no department is selected only Admin users can see this',
        },
      ],
      [
        'share_employees',
        {
          label: 'Share Employees',
          type: 'select2multi',
          'allow-null': true,
          'null-label': 'All Employees',
          'remote-source': ['Employee', 'id', 'first_name+last_name'],
          validation: 'none',
          help: 'Instead of sharing with all the employees in a department, you can share it only with specific employees',
        },
      ],
    ];
  }
}

/**
 * EmployeeDocumentAdapter
 */

class EmployeeDocumentAdapter extends AdapterBase {
  getDataMapping() {
    return [
      'id',
      'employee',
      'document',
      'details',
      'date_added',
      'status',
      'attachment',
    ];
  }

  getHeaders() {
    return [
      { sTitle: 'ID', bVisible: false },
      { sTitle: 'Employee' },
      { sTitle: 'Document' },
      { sTitle: 'Details' },
      { sTitle: 'Date Added' },
      { sTitle: 'Status' },
      { sTitle: 'Attachment', bVisible: false },
    ];
  }

  getFormFields() {
    return [
      ['id', { label: 'ID', type: 'hidden' }],
      ['employee', {
        label: 'Employee',
        type: 'select2',
        sort: 'none',
        'allow-null': false,
        'remote-source': ['Employee', 'id', 'first_name+last_name', 'getActiveSubordinateEmployees'],
      }],
      ['document', { label: 'Document', type: 'select2', 'remote-source': ['Document', 'id', 'name'] }],
      ['date_added', { label: 'Date Added', type: 'date', validation: '' }],
      ['valid_until', { label: 'Valid Until', type: 'date', validation: 'none' }],
      ['status', { label: 'Status', type: 'select', source: [['Active', 'Active'], ['Inactive', 'Inactive'], ['Draft', 'Draft']] }],
      ['visible_to', { label: 'Visible To', type: 'select', source: [['Owner', 'Owner'], ['Manager', 'Manager'], ['Admin', 'Admin']] }],
      ['details', { label: 'Details', type: 'textarea', validation: 'none' }],
      ['attachment', { label: 'Attachment', type: 'fileupload', validation: '' }],
    ];
  }


  getFilters() {
    return [
      ['employee', { label: 'Employee', type: 'select2', 'remote-source': ['Employee', 'id', 'first_name+last_name', 'getActiveSubordinateEmployees'] }],

    ];
  }


  getActionButtonsHtml(id, data) {
    let html = '<div style="width:80px;">'
      + '<img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img>'
      + '<img class="tableActionButton" src="_BASE_images/download.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Download Document" onclick="download(\'_attachment_\');return false;"></img>'
      + '<img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Delete" onclick="modJs.deleteRow(_id_);return false;"></img>'
      + '</div>';
    html = html.replace(/_id_/g, id);
    html = html.replace(/_attachment_/g, data[6]);
    html = html.replace(/_BASE_/g, this.baseUrl);
    return html;
  }

  isSubProfileTable() {
    return this.user.user_level !== 'Admin' && this.user.user_level !== 'Restricted Admin';
  }
}

module.exports = { DocumentAdapter, CompanyDocumentAdapter, EmployeeDocumentAdapter };
