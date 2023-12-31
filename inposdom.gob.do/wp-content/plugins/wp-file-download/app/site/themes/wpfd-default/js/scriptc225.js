/**
 * WP File Download
 *
 * @package WP File Download
 * @author Joomunited
 * @version 1.0
 */

jQuery(document).ready(function ($) {
    // var sourcefiles = $("#wpfd-template-files").html();
    // var sourcecategories = $("#wpfd-template-categories").html();
    var default_hash = window.location.hash;
    var tree = $('.wpfd-foldertree-default');
    var tree_source_cat = $('.wpfd-content-default').data('category');
    var cParents = {};
    if (window.wpfdAjax === undefined) {
        window.wpfdAjax = {};
    }
    window.wpfdAjax[tree_source_cat] = {category: null, file: null};

    $(".wpfd-content-default").each(function () {
        var topCat = $(this).data('category');
        cParents[topCat] = {parent: 0, term_id: topCat, name: $(this).find("h2").text()};
        $(this).find(".wpfdcategory.catlink").each(function () {
            var tempidCat = $(this).data('idcat');
            if (tempidCat == 'all_0') {
                cParents[tempidCat] = {parent: 0, term_id: 0, name: $(this).text()};
            } else {
                cParents[tempidCat] = {parent: topCat, term_id: tempidCat, name: $(this).text()};
            }
        });
        initInputSelected(topCat);
        initDownloadSelected(topCat);
    });

    Handlebars.registerHelper('bytesToSize', function (bytes) {
        return bytes.toString().toLowerCase() === 'n/a' ? bytes : bytesToSize(parseInt(bytes));
    });

    Handlebars.registerHelper("xif", function(param, second, options) {
        if (param === second) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    function default_initClick() {
        $('.wpfd-content-default .catlink').unbind('click').click(function () {
            default_load($(this).parents('.wpfd-content-default.wpfd-content-multi').data('category'), $(this).data('idcat'));
            return false;
        });
    }

    function initInputSelected(sc) {
        $(document).on('change', ".wpfd-content-default.wpfd-content-multi[data-category=" + sc + "] input.cbox_file_download", function () {
            var rootCat = ".wpfd-content-default.wpfd-content-multi[data-category=" + sc + "]";
            var selectedFiles = $(rootCat + " input.cbox_file_download:checked");
            var filesId = [];
            if (selectedFiles.length) {
                selectedFiles.each(function (index, file) {
                    filesId.push($(file).data('id'));
                });
            }
            if (filesId.length > 0) {
                $(rootCat + " .wpfdSelectedFiles").remove();
                $('<input type="hidden" class="wpfdSelectedFiles" value="' + filesId.join(',') + '" />')
                    .insertAfter($(rootCat).find(" #current_category_slug_" + sc));
                hideDownloadAllBtn(sc, true);
                $(rootCat + " .default-download-selected").remove();
                var downloadSelectedBtn = $('<a href="javascript:void(0);" class="default-download-selected" style="display: block;">' + wpfdparams.translates.download_selected + '<i class="zmdi zmdi-check-all wpfd-download-category"></i></a>');
                downloadSelectedBtn.insertAfter($(rootCat).find(" #current_category_slug_" + sc));
            } else {
                $(rootCat + " .wpfdSelectedFiles").remove();
                $(rootCat + " .default-download-selected").remove();
                hideDownloadAllBtn(sc, false);
            }
        });
    }

    function hideDownloadAllBtn(sc, hide) {
        var rootCat = ".wpfd-content-default.wpfd-content-multi[data-category=" + sc + "]";
        var downloadCatButton = $(rootCat + " .default-download-category");
        if (downloadCatButton.length === 0 || downloadCatButton.hasClass('display-download-category')) {
            return;
        }
        if (hide) {
            $(rootCat + " .default-download-category").hide();
        } else {
            $(rootCat + " .default-download-category").show();
        }
    }

    function initDownloadSelected(sc) {
        var rootCat = ".wpfd-content-default.wpfd-content-multi[data-category=" + sc + "]";
        $(document).on('click', rootCat + ' .default-download-selected', function () {
            if ($(rootCat).find('.wpfdSelectedFiles').length > 0) {
                var current_category = $(rootCat).find('#current_category_' + sc).val();
                var category_name = $(rootCat).find('#current_category_slug_' + sc).val();
                var selectedFilesId = $(rootCat).find('.wpfdSelectedFiles').val();
                $.ajax({
                    url: wpfdparams.wpfdajaxurl + "?action=wpfd&task=files.zipSeletedFiles&filesId=" + selectedFilesId + "&wpfd_category_id=" + current_category,
                    dataType: "json",
                }).done(function (results) {
                    if (results.success) {
                        var hash = results.data.hash;
                        window.location.href = wpfdparams.wpfdajaxurl + "?action=wpfd&task=files.downloadZipedFile&hash=" + hash + "&wpfd_category_id=" + current_category + "&wpfd_category_name=" + category_name;
                    } else {
                        alert(results.data.message);
                    }
                })
            }
        });
    }
    default_initClick();

    default_hash = default_hash.replace('#', '');
    if (default_hash !== '' && default_hash.indexOf('-wpfd-') !== -1) {
        var hasha = default_hash.split('-');
        var re = new RegExp("^(p[0-9]+)$");
        var page = null;
        var stringpage = hasha.pop();

        if (re.test(stringpage)) {
            page = stringpage.replace('p', '');
        }

        var hash_category_id = hasha[1];
        var hash_sourcecat = hasha[0];

        if (parseInt(hash_category_id) > 0 || hash_category_id === 'all_0') {
            if (hash_category_id == 'all_0') {
                hash_category_id = 0;
            }
            setTimeout(function () {
                default_load(hash_sourcecat, hash_category_id, page);
            }, 100);
        }
    }

    function default_load(sourcecat, catid, page) {
        $(document).trigger('wpfd:category-loading');
        var pathname = window.location.href.replace(window.location.hash, '');
        var container = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]");
        var containerDefault = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .wpfd-container-default");
        var empty_subcategories = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] #wpfd_is_empty_subcategories");
        var empty_files = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] #wpfd_is_empty_files");
        container.find('#current_category_' + sourcecat).val(catid);
        container.next('.wpfd-pagination').remove();

        containerDefault.empty();
        containerDefault.html($('#wpfd-loading-wrap').html());

        if (empty_subcategories.length) {
            empty_subcategories.val('1');
        }
        if (empty_files.length) {
            empty_files.val('1');
        }

        //Get categories
        var oldCategoryAjax = window.wpfdAjax[tree_source_cat].category;
        if (oldCategoryAjax !== null) {
            oldCategoryAjax.abort();
        }
        window.wpfdAjax[tree_source_cat].category = $.ajax({
            url: wpfdparams.wpfdajaxurl + "?action=wpfd&task=categories.display&view=categories&id=" + catid + "&top=" + sourcecat,
            dataType: "json"
        }).done(function (categories) {
            if (page !== null && page !== undefined) {
                window.history.pushState('', document.title, pathname + '#' + sourcecat + '-' + catid + '-wpfd-' + categories.category.slug + '-p' + page);
            } else {
                window.history.pushState('', document.title, pathname + '#' + sourcecat + '-' + catid + '-wpfd-' + categories.category.slug);
            }

            container.find('#current_category_slug_' + sourcecat).val(categories.category.slug);
            var sourcecategories = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .wpfd-template-categories").html();
            if (sourcecategories) {
                var template = Handlebars.compile(sourcecategories);
                var html = template(categories);
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").prepend(html);
            }
            if (categories.category.breadcrumbs !== undefined) {
                $(".wpfd-content-multi[data-category=" + sourcecat + "] .breadcrumbs").html(categories.category.breadcrumbs);
            }
            for (var i = 0; i < categories.categories.length; i++) {
                cParents[categories.categories[i].term_id] = categories.categories[i];
            }

            default_breadcrum(sourcecat, catid, categories.category);
            default_initClick();

            if (tree.length) {
                var currentTree = container.find('.wpfd-foldertree-default');
                currentTree.find('li').removeClass('selected');
                currentTree.find('i.md').removeClass('md-folder-open').addClass("md-folder");

                currentTree.jaofiletree('open', catid, currentTree);

                var el = currentTree.find('a[data-file="' + catid + '"]').parent();
                el.find(' > i.md').removeClass("md-folder").addClass("md-folder-open");

                if (!el.hasClass('selected')) {
                    el.addClass('selected');
                }
                var ps = currentTree.find('.icon-open-close');

                $.each(ps.get().reverse(), function (i, p) {
                    if (typeof $(p).data() !== 'undefined' && $(p).data('id') == Number(hash_category_id)) {
                        hash_category_id = $(p).data('parent_id');
                        $(p).click();
                    }
                });

            }

            if ($(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default > .wpfd-password-form").length) {
                hideDownloadAllBtn(sourcecat, true);
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .default-download-category").attr('href', '#');
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfdcategory").hide();
            }

            if (empty_subcategories.length) {
                empty_subcategories.val(categories.categories.length);
                fire_empty_category_message(sourcecat);
            }
        });
        var ordering = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]").find('#current_ordering_' + sourcecat).val();
        var orderingDirection = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]").find('#current_ordering_direction_' + sourcecat).val();

        var page_limit = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]").find('#page_limit_' + sourcecat).val();
        var params = $.param({
            task: 'files.display',
            view: 'files',
            id: catid,
            rootcat: sourcecat,
            page: page,
            orderCol: ordering,
            orderDir: orderingDirection,
            page_limit: page_limit
        });
        //Get files
        var oldFileAjax = window.wpfdAjax[tree_source_cat].file;
        if (oldFileAjax !== null) {
            oldFileAjax.abort();
        }
        window.wpfdAjax[tree_source_cat].file = $.ajax({
            url: wpfdparams.wpfdajaxurl + params,
            dataType: "json"
        }).done(function (content) {
            if (typeof (content.categoryPassword) !== 'undefined' && content.categoryPassword.length) {
                hideDownloadAllBtn(sourcecat, true);
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .default-download-category").attr('href', '#');
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfdcategory").hide();
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").empty();
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").append(content.categoryPassword);
            } else {
                if (content.files.length) {
                    $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .default-download-category").removeClass("display-download-category");
                } else {
                    $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .default-download-category").addClass("display-download-category");
                }

                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]").after(content.pagination);
                delete content.pagination;
                var sourcefiles = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .wpfd-template-files").html()
                var template = Handlebars.compile(sourcefiles);
                var html = template(content);
                html = $('<textarea/>').html(html).val();
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").append(html);

                if (typeof (content.filepasswords) !== 'undefined') {
                    $.each(content.filepasswords, function( file_id, pw_form ) {
                        $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").find('.file[data-id="' + file_id + '"]').empty();
                        $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").find('.file[data-id="' + file_id + '"]').addClass('wpfd-password-protection-form');
                        $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").find('.file[data-id="' + file_id + '"]').append(pw_form);
                    });
                }

                if (content.uploadform !== undefined && content.uploadform.length) {
                    var upload_form_html = '<div class="wpfd-upload-form" style="margin: 20px 10px">';
                    upload_form_html += content.uploadform;
                    upload_form_html += '</div>';
                    $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfd-container-default").append(upload_form_html);

                    if (typeof (Wpfd) === 'undefined') {
                        Wpfd = {};
                    }

                    _wpfd_text = function (text) {
                        if (typeof (l10n) !== 'undefined') {
                            return l10n[text];
                        }
                        return text;
                    };

                    function toMB(mb) {
                        return mb * 1024 * 1024;
                    }

                    var allowedExt = wpfd_admin.allowed;
                    allowedExt = allowedExt.split(',');
                    allowedExt.sort();

                    var initUploader = function (currentContainer) {
                        // Init the uploader
                        var uploader = new Resumable({
                            target: wpfd_var.wpfdajaxurl + '?action=wpfd&task=files.upload&upload_from=front',
                            query: {
                                id_category: $(currentContainer).find('input[name=id_category]').val(),
                            },
                            fileParameterName: 'file_upload',
                            simultaneousUploads: 2,
                            maxFileSize: toMB(wpfd_admin.maxFileSize),
                            maxFileSizeErrorCallback: function (file) {
                                bootbox.alert(file.name + ' ' + _wpfd_text('is too large') + '!');
                            },
                            chunkSize: wpfd_admin.serverUploadLimit - 50 * 1024, // Reduce 50KB to avoid error
                            forceChunkSize: true,
                            fileType: allowedExt,
                            fileTypeErrorCallback: function (file) {
                                bootbox.alert(file.name + ' cannot upload!<br/><br/>' + _wpfd_text('This type of file is not allowed to be uploaded. You can add new file types in the plugin configuration'));
                            },
                            generateUniqueIdentifier: function (file, event) {
                                var relativePath = file.webkitRelativePath || file.fileName || file.name;
                                var size = file.size;
                                var prefix = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                return (prefix + size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));
                            }
                        });

                        if (!uploader.support) {
                            bootbox.alert(_wpfd_text('Your browser does not support HTML5 file uploads!'));
                        }

                        if (typeof (willUpload) === 'undefined') {
                            var willUpload = true;
                        }

                        uploader.on('filesAdded', function (files) {
                            files.forEach(function (file) {
                                var progressBlock = '<div class="wpfd_process_block" id="' + file.uniqueIdentifier + '">'
                                    + '<div class="wpfd_process_fileinfo">'
                                    + '<span class="wpfd_process_filename">' + file.fileName + '</span>'
                                    + '<span class="wpfd_process_cancel">Cancel</span>'
                                    + '</div>'
                                    + '<div class="wpfd_process_full" style="display: block;">'
                                    + '<div class="wpfd_process_run" data-w="0" style="width: 0%;"></div>'
                                    + '</div></div>';

                                //$('#preview', '.wpreview').before(progressBlock);
                                currentContainer.find('#preview', '.wpreview').before(progressBlock);
                                $(currentContainer).find('.wpfd_process_cancel').unbind('click').click(function () {
                                    fileID = $(this).parents('.wpfd_process_block').attr('id');
                                    fileObj = uploader.getFromUniqueIdentifier(fileID);
                                    uploader.removeFile(fileObj);
                                    $(this).parents('.wpfd_process_block').fadeOut('normal', function () {
                                        $(this).remove();
                                    });

                                    if (uploader.files.length === 0) {
                                        $(currentContainer).find('.wpfd_process_pause').fadeOut('normal', function () {
                                            $(this).remove();
                                        });
                                    }

                                    $.ajax({
                                        url: wpfd_var.wpfdajaxurl + '?action=wpfd&task=files.upload',
                                        method: 'POST',
                                        dataType: 'json',
                                        data: {
                                            id_category: $('input[name=id_category]').val(),
                                            deleteChunks: fileID
                                        },
                                        success: function (res, stt) {
                                            if (res.response === true) {
                                            }
                                        }
                                    })
                                });
                            });

                            // Do not run uploader if no files added or upload same files again
                            if (files.length > 0) {
                                uploadPauseBtn = $(currentContainer).find('.wpreview').find('.wpfd_process_pause').length;
                                restableBlock = $(currentContainer).find('.wpfd_process_block');

                                if (!uploadPauseBtn) {
                                    restableBlock.before('<div class="wpfd_process_pause">Pause</div>');
                                    $(currentContainer).find('.wpfd_process_pause').unbind('click').click(function () {
                                        if (uploader.isUploading()) {
                                            uploader.pause();
                                            $(this).text('Start');
                                            $(this).addClass('paused');
                                            willUpload = false;
                                        } else {
                                            uploader.upload();
                                            $(this).text('Pause');
                                            $(this).removeClass('paused');
                                            willUpload = true;
                                        }
                                    });
                                }

                                uploader.opts.query = {
                                    id_category: currentContainer.find('input[name=id_category]').val()
                                };

                                if (willUpload) uploader.upload();
                            }
                        });

                        uploader.on('fileProgress', function (file) {
                            $(currentContainer).find('.wpfd_process_block#' + file.uniqueIdentifier)
                                .find('.wpfd_process_run').width(Math.floor(file.progress() * 100) + '%');
                        });

                        uploader.on('fileSuccess', function (file, res) {
                            var thisUploadBlock = currentContainer.find('.wpfd_process_block#' + file.uniqueIdentifier);
                            thisUploadBlock.find('.wpfd_process_cancel').addClass('uploadDone').text('OK').unbind('click');
                            thisUploadBlock.find('.wpfd_process_full').remove();

                            var response = JSON.parse(res);
                            if (response.response === false && typeof(response.datas) !== 'undefined') {
                                if (typeof(response.datas.code) !== 'undefined' && response.datas.code > 20) {
                                    bootbox.alert('<div>' + response.datas.message + '</div>');
                                    return false;
                                }
                            }
                            if (typeof(response) === 'string') {
                                bootbox.alert('<div>' + response + '</div>');
                                return false;
                            }

                            if (response.response !== true) {
                                bootbox.alert(response.response);
                                return false;
                            }
                        });

                        uploader.on('fileError', function (file, msg) {
                            thisUploadBlock = currentContainer.find('.wpfd_process_block#' + file.uniqueIdentifier);
                            thisUploadBlock.find('.wpfd_process_cancel').addClass('uploadError').text('Error').unbind('click');
                            thisUploadBlock.find('.wpfd_process_full').remove();
                        });

                        uploader.on('complete', function () {
                            var fileCount  = $(currentContainer).find('.wpfd_process_cancel').length;
                            var categoryId = $(currentContainer).find('input[name=id_category]').val();

                            $.ajax({
                                url: wpfd_var.wpfdajaxurl + '?action=wpfd&task=files.wpfdPendingUploadFiles',
                                method: 'POST',
                                dataType: 'json',
                                data: {
                                    uploadedFiles: fileCount,
                                    id_category: categoryId,
                                },
                                success: function (res) {
                                    currentContainer.find('.progress').delay(300).fadeIn(300).hide(300, function () {
                                        $(this).remove();
                                    });
                                    currentContainer.find('.uploaded').delay(300).fadeIn(300).hide(300, function () {
                                        $(this).remove();
                                    });
                                    $('#wpreview .file').delay(1200).show(1200, function () {
                                        $(this).removeClass('done placeholder');
                                    });

                                    $('.gritter-item-wrapper ').remove();
                                    $(currentContainer).find('#wpfd-upload-messages').append('File(s) uploaded with success!');
                                    $(currentContainer).find('#wpfd-upload-messages').delay(1200).fadeIn(1200, function () {
                                        $(currentContainer).find('#wpfd-upload-messages').empty();
                                        $(currentContainer).find('.wpfd_process_pause').remove();
                                        $(currentContainer).find('.wpfd_process_block').remove();
                                    });

                                    // Call list files
                                    if (currentContainer.parent('.wpfd-upload-form').length) {
                                        var sourcecat         = currentContainer.parents('.wpfd-content.wpfd-content-multi').data('category');
                                        var current_category  = currentContainer.parents('.wpfd-content.wpfd-content-multi').find('#current_category_' + sourcecat).val();

                                        default_load(sourcecat, current_category);
                                        return false;
                                    }
                                }
                            });
                        });

                        uploader.assignBrowse($(currentContainer).find('#upload_button'));
                        uploader.assignDrop($(currentContainer).find('.jsWpfdFrontUpload'));
                    }

                    var containers = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] div[class*=wpfdUploadForm]");
                    if (containers.length > 0) {
                        containers.each(function(i, el) {
                            initUploader($(el));
                        });
                    }
                }

                if (typeof wpfdColorboxInit !== 'undefined') {
                    wpfdColorboxInit();
                }

                wpfdTrackDownload();

                default_init_pagination($('.wpfd-content-default[data-category=' + sourcecat + '] + .wpfd-pagination'));
                wpfd_remove_loading($(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .wpfd-container-default"));
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .wpfdSelectedFiles").remove();
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "] .default-download-selected").remove();
                hideDownloadAllBtn(sourcecat, false);
            }
            if (empty_files.length) {
                empty_files.val(content.files.length);
                fire_empty_category_message(sourcecat);
            }
        });
        $(document).trigger('wpfd:category-loaded');
    }

    function default_breadcrum(sourcecat, catid, category) {
        var links = [];
        var current_Cat = cParents[catid];
        var defaultdownloadcategory = $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .default-download-category");
        if (!current_Cat) {
            defaultdownloadcategory.attr('href', category.linkdownload_cat);
            return false;
        }
        links.unshift(current_Cat);
        if (current_Cat.parent !== 0) {
            while (cParents[current_Cat.parent]) {
                current_Cat = cParents[current_Cat.parent];
                links.unshift(current_Cat);
            }
        }

        var html = '';
        for (var i = 0; i < links.length; i++) {
            if (i < links.length - 1) {
                html += '<li><a class="catlink" data-idcat="' + links[i].term_id + '" href="javascript:void(0)">';
                html += links[i].name + '</a><span class="divider"> &gt; </span></li>';
            } else {
                html += '<li><span>' + links[i].name + '</span></li>';
            }
        }
        $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .wpfd-breadcrumbs-default li").remove();
        $(".wpfd-content-default.wpfd-content-multi[data-category=" + sourcecat + "]  .wpfd-breadcrumbs-default").append(html);
        defaultdownloadcategory.attr('href', category.linkdownload_cat);
    }

    if (tree.length) {
        tree.each(function () {
            var topCat = $(this).parents('.wpfd-content-default.wpfd-content-multi').data('category');
            $(this).jaofiletree({
                script: wpfdparams.wpfdajaxurl + 'task=categories.getCats',
                usecheckboxes: false,
                root: topCat,
                showroot: cParents[topCat].name,
                onclick: function (elem, file) {

                    var topCat = $(elem).parents('.wpfd-content-default.wpfd-content-multi').data('category');
                    if (topCat !== file) {
                        $('.directory', $(elem).parents('.wpfd-content-default.wpfd-content-multi')).each(function() {
                            if (!$(this).hasClass('selected') && $(this).find('> ul > li').length === 0) {
                                $(this).removeClass('expanded');
                            }
                        });

                        $(elem).parents('.directory').each(function () {
                            var $this = $(this);
                            var category = $this.find(' > a');
                            var parent = $this.find('.icon-open-close');
                            if (parent.length > 0) {
                                if (typeof cParents[category.data('file')] === 'undefined') {
                                    cParents[category.data('file')] = {
                                        parent: parent.data('parent_id'),
                                        term_id: category.data('file'),
                                        name: category.text()
                                    };
                                }
                            }
                        });

                    }

                    default_load(topCat, file);
                }
            });
        })

    }

    $('.wpfd-content-default + .wpfd-pagination').each(function (index, elm) {
        var $this = $(elm);
        default_init_pagination($this);
    });

    function default_init_pagination($this) {

        var number = $this.find('a:not(.current)');

        var wrap = $this.prev('.wpfd-content-default');

        var sourcecat = wrap.data('category');
        var current_category = wrap.find('#current_category_' + sourcecat).val();

        number.unbind('click').bind('click', function () {
            var page_number = $(this).attr('data-page');
            var current_sourcecat = $(this).attr('data-sourcecat');
            var wrap = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]");
            var current_category = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]").find('#current_category_' + current_sourcecat).val();
            if (typeof page_number !== 'undefined') {
                var pathname = window.location.href.replace(window.location.hash, '');
                var category = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]").find('#current_category_' + current_sourcecat).val();
                var category_slug = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]").find('#current_category_slug_' + current_sourcecat).val();
                var ordering = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]").find('#current_ordering_' + current_sourcecat).val();
                var orderingDirection = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]").find('#current_ordering_direction_' + current_sourcecat).val();

                var page_limit = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]").find('#page_limit_' + current_sourcecat).val();

                window.history.pushState('', document.title, pathname + '#' + current_sourcecat + '-' + category + '-wpfd-' + category_slug + '-p' + page_number);

                $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]  .wpfd-container-default .wpfd_list").remove();
                $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]  .wpfd-container-default").append($('#wpfd-loading-wrap').html());

                var params = $.param({
                    task: 'files.display',
                    view: 'files',
                    id: current_category,
                    rootcat: current_sourcecat,
                    page: page_number,
                    orderCol: ordering,
                    orderDir: orderingDirection,
                    page_limit: page_limit
                });

                //Get files
                $.ajax({
                    url: wpfdparams.wpfdajaxurl + params,
                    dataType: "json",
                    beforeSend: function () {
                        $('html, body').animate({scrollTop: $(".wpfd-content[data-category=" + current_sourcecat + "]").offset().top}, 'fast');
                    }
                }).done(function (content) {
                    delete content.category;
                    wrap.next('.wpfd-pagination').remove();
                    wrap.after(content.pagination);
                    delete content.pagination;
                    var sourcefiles = $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]  .wpfd-template-files").html()
                    var template = Handlebars.compile(sourcefiles);
                    var html = template(content);

                    if ($(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "] .wpfd-container-default .wpfd-upload-form").length) {
                        $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "] .wpfd-container-default .wpfd-upload-form").before(html);
                    } else {
                        $(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "] .wpfd-container-default").append(html);
                    }

                    if (typeof wpfdColorboxInit !== 'undefined') {
                        wpfdColorboxInit();
                    }
                    default_init_pagination(wrap.next('.wpfd-pagination'));
                    wpfd_remove_loading($(".wpfd-content-default.wpfd-content-multi[data-category=" + current_sourcecat + "]  .wpfd-container-default"));
                });
            }
        });
    }

    function wpfd_container_with_foldertree() {
        $('.wpfd-content-default .wpfd-container').each(function () {
            if($(this).children('.with_foldertree').length > 0) {
                $(this).addClass('wpfd_dfcontainer_foldertree');
            } else {
                if($(this).hasClass('wpfd_dfcontainer_foldertree')) {
                    $(this).removeClass('wpfd_dfcontainer_foldertree');
                }
            }
        });

        //parent-content
        $('.wpfd-content-default').each(function () {
            if($(this).children().has('.wpfd-foldertree').length > 0) {
                $(this).addClass('wpfd_contentdefault_foldertree');
            } else {
                if($(this).hasClass('wpfd_contentdefault_foldertree')) {
                    $(this).removeClass('wpfd_contentdefault_foldertree');
                }
            }
        });
    }

    wpfd_container_with_foldertree();

    function fire_empty_category_message(category_id) {
        if (!category_id) {
            return;
        }
        var root_category = '.wpfd-content-default.wpfd-content-multi[data-category=' + category_id + ']';
        var display_empty_category_message = $(root_category).find('#wpfd_display_empty_category_message').val();
        var empty_category_message_val = $(root_category).find('#wpfd_empty_category_message_val').val();
        var is_empty_subcategories = $(root_category).find('#wpfd_is_empty_subcategories').val();
        var is_empty_files = $(root_category).find('#wpfd_is_empty_files').val();

        if (parseInt(display_empty_category_message) !== 1
            || parseInt(is_empty_subcategories) !== 0 || parseInt(is_empty_files) !== 0 ) {
            return;
        }

        var code = '<div class="wpfd-empty-category-message-section">';
        code += '<p class="wpfd-empty-category-message">';
        code += empty_category_message_val;
        code += '</p>';
        code += '</div>';

        $(root_category).find('.wpfd-empty-category-message-section').remove();
        $(root_category).find('.wpfd-container-default').append(code);
    }
});
