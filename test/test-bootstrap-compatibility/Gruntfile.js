'use strict';

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		config: {
			dist: './'
		},
		clean: {
			build: {
				src: [
					"assets/",
					"components/",
					"css/",
					"customize/",
					"examples/",
					"getting-started/",
					"javascript/",
					"index.html"
				]
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '../../src/style/bootstrap3/_gh_pages/',
						dest: './',
						src: [
							'index.html',
							'**/*'
						]
					}
				]
			}
		},
		replace: {
			index: {
				src: ['index.html'],
				dest: 'index.html',
				replacements: [
					{
						from: '"/assets',
						to: '"assets'
					},
					{
						from: 'href="/"',
						to: 'href="./"'
					}
				]
			},
			oneDepth: {
				src: ['**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/assets',
						to: '"../assets'
					},
					{
						from: 'href="/"',
						to: 'href="../"'
					}
				]
			},
			twoDepth: {
				src: ['examples/**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/assets',
						to: '"../../assets'
					},
					{
						from: '"../assets',
						to: '"../../assets'
					}
				]
			},
			navLinkReplace: {
				src: ['index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/getting-started',
						to: '"getting-started'
					},
					{
						from: '"/css',
						to: '"css'
					},
					{
						from: '"/components',
						to: '"components'
					},
					{
						from: '"/javascript',
						to: '"javascript'
					},
					{
						from: '"/customize',
						to: '"customize'
					}
				]
			},
			navLinkReplaceOneDepth: {
				src: ['**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/getting-started',
						to: '"../getting-started'
					},
					{
						from: '"/css',
						to: '"../css'
					},
					{
						from: '"/components',
						to: '"../components'
					},
					{
						from: '"/javascript',
						to: '"../javascript'
					},
					{
						from: '"/customize',
						to: '"../customize'
					}
				]
			},
			changeTheme: {
				src: ['index.html', '**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: 'assets/css/bootstrap.css" rel="stylesheet">',
						to: '../../grunt-dist/lib/bootstrap/css/bootstrap.css" rel="stylesheet">'
					}
				]
			},
			changeThemeOneDepth: {
				src: ['**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '/bootstrap.css" rel="stylesheet">',
						to: '/bootstrap.css" rel="stylesheet"><link href="../../../grunt-dist/src/style/theme-wireframe/cornerstone.css" rel="stylesheet">'
					}
				]
			},
			changeThemeTwoDepth: {
				src: ['examples/**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '/bootstrap.css" rel="stylesheet">',
						to: '/bootstrap.css" rel="stylesheet"><link href="../../../../grunt-dist/src/style/theme-wireframe/cornerstone.css" rel="stylesheet">'
					}
				]
			}
		}
	});

	// These plugins provide necessary tasks.
	//grunt-contrib-clean
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');

	// Default task.
	grunt.registerTask('default', ['clean', 'copy', 'replace']);
};